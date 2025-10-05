export const commands = [
    {
        command: "command",
        description: "test description",
        options: [
            {
                flag: "test flag",
                description: "location description",
                required: true,
            },
        ],

        action: () => { }
    },
    {
        command: "command 2",
        description: "test description 2",
        options: [
            {
                flag: "test flag 2",
                description: "location description 2",
                required: false,
            },
        ],

        action: () => { },
    },
]