import { IAction } from "@/interfaces/IAction"

export const parseToActions = (nodes: IAction[], actions: IAction[]) => {
    nodes.forEach((n: IAction) => {
        if (n.type !== "Node.Begin" && n.type !== "Node.End") {
            if (n.data) {
                if (n.type == "Microsoft.IfCondition") {
                    const action = n.data
                    action.actions = []
                    action.elseActions = []
                    parseToActions(n.children[0].children, action.actions)
                    parseToActions(n.children[1].children, action.elseActions)
                    actions.push(action)
                    return
                }

                if (n.type == "Microsoft.SwitchCondition") {
                    const action = n.data

                    action.cases = []
                    action.cases = n.children.map((c: any) => {
                        const switchCase = c.data;
                        switchCase.actions = []
                        const actions: never[] = [];
                        parseToActions(c.children, actions)
                        switchCase.actions = actions
                        return switchCase
                    })
                    actions.push(action)
                    return
                }

                actions.push(n.data)
            }
        }
    })
}

export const ObjectId = (m = Math, d = Date, h = 16, s = (s: number) => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

export const setByPath = (obj: any, path: string, value: any) => {
    const segments = path.split('.');
    const lastKey = segments.pop();

    let target = obj;

    for (let i = 0; i < segments.length; i++) {
        const key = segments[i];
        if (!(key in target)) {
            target[key] = {}
        }
        target = target[key];
    }

    if (lastKey) {
        target[lastKey] = value;
    }

    return obj;
}