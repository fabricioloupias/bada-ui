import { Content } from "@/components/antd";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false })

type EditorTriggerIdProps = {
    params: {
        triggerId: string
    };
};

export default function EditorTriggerIdPage({ params }: EditorTriggerIdProps) {
    return (
        <>
            <Editor
                triggerId={params.triggerId}
            />
        </>
    );
}