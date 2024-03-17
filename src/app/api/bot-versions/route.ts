import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "../../../lib/utils";
import connectDB from "../../../lib/connect-db";
import mongoose, { HydratedDocument, mongo } from "mongoose";
import { BotVersionModel } from "@/models/BotVersion";
import { VersionCounterModel } from "@/models/VersionCounter";
import { AdaptiveDialog, AdaptiveDialogsModel } from "@/models/AdaptiveDialog";
import { Action, ActionModel } from "@/models/Action";
import { Trigger, TriggerModel } from "@/models/Trigger";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const botId = request.nextUrl.searchParams.get("botId");
        const page_str = request.nextUrl.searchParams.get("page");
        const limit_str = request.nextUrl.searchParams.get("limit");

        const filterPage = page_str ? parseInt(page_str, 10) : 1;
        const filterLimit = limit_str ? parseInt(limit_str, 10) : 10;

        const page = filterPage ?? 1;
        const limit = filterLimit ?? 10;
        const skip = (page - 1) * limit;

        if (!botId) {
            return NextResponse.json({
                status: "error",
                message: "Faltan parámetros"
            });
        }

        const data = await BotVersionModel.find({
            botId: new mongoose.Types.ObjectId(botId)
        });
        const results = data.length;

        let json_response = {
            status: "success",
            results,
            bot_versions: data,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

type NewBotVersionDTO = {
    botId: string;
    userId: string;
    fromVersionId: string;
}

//crear nueva version para un bot
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json() as NewBotVersionDTO

        const versionCounter = await VersionCounterModel.findOne({
            botId: new mongoose.Types.ObjectId(body.botId)
        })

        if (versionCounter) {
            const newCount = versionCounter.counter + 1
            const newBotVersion = await BotVersionModel.create({
                botId: new mongoose.Types.ObjectId(body.botId),
                isDraft: true,
                createdBy: body.userId, // TODO: modificar cuando este el object id
                version: newCount
            })

            const batchSizeAdaptive = 50; // Tamaño del lote
            let skip = 0;
            let documentosProcesados = 0;
            let moreDocuments = true;

            while (moreDocuments) {
                // Obtener los documentos que deseas duplicar en lotes paginados
                const adaptiveDialogsOriginals = await AdaptiveDialogsModel.find<AdaptiveDialog>({
                    botVersionId: new mongoose.Types.ObjectId(body.fromVersionId)
                })
                    .skip(skip)
                    .limit(batchSizeAdaptive);

                if (adaptiveDialogsOriginals.length === 0) {
                    // No hay más documentos para procesar
                    moreDocuments = false;
                    break;
                }

                let bulkOperations: mongo.AnyBulkWriteOperation[] = []

                // Crear una lista de operaciones bulkWrite para el lote actual
                for (const adaptiveDialogOriginal of adaptiveDialogsOriginals) {
                    const oldAdaptiveDialogId = adaptiveDialogOriginal._id
                    adaptiveDialogOriginal._id = new mongoose.Types.ObjectId()
                    adaptiveDialogOriginal.botVersionId = newBotVersion._id
                    bulkOperations.push(
                        {
                            insertOne: {
                                document: adaptiveDialogOriginal
                            }
                        }
                    )

                    const batchSizeTriggers = 50; // Tamaño del lote
                    let skipTriggers = 0;
                    let moreTriggers = true;


                    while (moreTriggers) {
                        const triggerOriginals = await TriggerModel.find<Trigger>({
                            adaptiveDialogId: oldAdaptiveDialogId
                        })
                            .skip(skipTriggers)
                            .limit(batchSizeTriggers);

                        if (triggerOriginals.length === 0) {
                            // No hay más triggers para procesar
                            moreTriggers = false;
                            break;
                        }

                        let bulkTriggerOperations: mongo.AnyBulkWriteOperation[] = []

                        for (const triggerOriginal of triggerOriginals) {
                            const oldTriggerId = triggerOriginal._id
                            triggerOriginal._id = new mongoose.Types.ObjectId()
                            triggerOriginal.adaptiveDialogId = adaptiveDialogOriginal._id
                            bulkTriggerOperations.push(
                                {
                                    insertOne: {
                                        document: triggerOriginal
                                    }
                                }
                            )

                            const batchSizeActions = 50; // Tamaño del lote
                            let skipActions = 0;
                            let moreActions = true;

                            while (moreActions) {
                                const actionsOriginals = await ActionModel.find<Action>({
                                    triggerId: oldTriggerId
                                })
                                    .skip(skipActions)
                                    .limit(batchSizeActions);

                                if (actionsOriginals.length === 0) {
                                    // No hay más actions para procesar
                                    moreActions = false;
                                    break;
                                }

                                let bulkActionsOperations: mongo.AnyBulkWriteOperation[] = []
                                for (const actionOriginal of actionsOriginals) {
                                    actionOriginal._id = new mongoose.Types.ObjectId()
                                    actionOriginal.triggerId = triggerOriginal._id
                                    bulkActionsOperations.push(
                                        {
                                            insertOne: {
                                                document: actionOriginal
                                            }
                                        }
                                    )
                                }

                                // Ejecutar las operaciones bulkWrite para el lote de actions
                                await ActionModel.bulkWrite(bulkActionsOperations);

                                skipActions += batchSizeActions;
                            }

                        }

                        await TriggerModel.bulkWrite(bulkTriggerOperations);

                        skipTriggers += batchSizeTriggers;
                    }
                }

                // Ejecutar las operaciones bulkWrite para el lote actual
                await AdaptiveDialogsModel.bulkWrite(bulkOperations);

                // Actualizar el contador de documentos procesados y ajustar el salto para el siguiente lote
                documentosProcesados += adaptiveDialogsOriginals.length;
                skip += batchSizeAdaptive;
            }

            console.log(`Total de documentos duplicados y actualizados: ${documentosProcesados}`);
            versionCounter.counter++
            await versionCounter.save()


            let json_response = {
                status: "success",
                bot_version: newBotVersion,
            };
            return NextResponse.json(json_response);
        }

        return createErrorResponse("Bot no encontrado", 404);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

