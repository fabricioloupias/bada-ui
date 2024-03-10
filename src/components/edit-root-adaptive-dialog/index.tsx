import { IAdaptiveDialog } from "@/interfaces/IAdaptiveDialog"
import { Title } from "../antd"

type EditRootAdaptiveDialogProps = {
    adaptiveDialog: IAdaptiveDialog
}

export default function EditRootAdaptiveDialog({ adaptiveDialog }: EditRootAdaptiveDialogProps) {
    return (<>
        <Title style={{
            marginTop: 0
        }} level={5}>
            Reconocedores
        </Title>
        <>{JSON.stringify(adaptiveDialog)}</>
    </>
    )
}