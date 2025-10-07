import type { CommandArgs } from "src/cli/commands";
export const commands: CommandArgs[] = [
    {
        command: "upload",
        description: "test description",
        options: [
            {
                flag: "test flag",
                description: "location description",
                required: true,
            },
        ],

        action: (_options: any) => { return Promise.resolve(); }
    },
    {
        command: "upload",
        description: "test description 2",
        options: [
            {
                flag: "test flag 2",
                description: "location description 2",
                required: false,
            },
        ],

        action: (_options: any) => { return Promise.resolve(); }
    },
]