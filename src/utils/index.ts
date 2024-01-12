import { Action } from "@/models/Action"

export const parseToActions = (nodes: Action[], actions: Action[]) => {
    nodes.forEach((n: Action) => {
        if (n.data) {
            if (n.type === "Microsoft.IfCondition") {
                const action = n.data
                action.actions = []
                action.elseActions = []
                parseToActions(n.children[0].children, action.actions)
                parseToActions(n.children[1].children, action.elseActions)
                actions.push(action)
            }

            if (n.type === "Microsoft.SwitchCondition") {
                const action = n.data

                action.cases = []
                n.children.forEach((c: Action) => {
                    if (c.children.length > 0) {
                        const switchCase = c.data;
                        switchCase.actions = []
                        const actions: Action[] = [];
                        parseToActions(c.children, actions)
                        switchCase.actions = actions
                        action.cases.push(switchCase)
                    }
                })
                actions.push(action)
            }

            if (n.type === "Microsoft.BeginDialog") {
                actions.push(n.data)
            }

            if (n.type === "Microsoft.SendActivity") {
                actions.push(n.data)
            }

            if (n.type === "Microsoft.ChoiceInput") {
                actions.push(n.data)
            }

            if (n.type === "Microsoft.TextInput") {
                actions.push(n.data)
            }

            if (n.type === "Microsoft.HttpRequest") {
                actions.push(n.data)
            }

            if (n.type === "Microsoft.CancelAllDialogs") {
                actions.push(n.data)
            }

            if (n.type === "Microsoft.SetProperty") {
                actions.push(n.data)
            }

            if (n.type === "Microsoft.EndTurn") {
                actions.push(n.data)
            }

            if (n.type === "Bada.SendHandoff") {
                actions.push(n.data)
            }

            if (n.type === "Bada.FunnelTag") {
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