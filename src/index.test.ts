
import { init } from "./index";

const MockCommand = jest.fn().mockImplementation(() => {
    return {
        name: jest.fn().mockReturnThis(),
        description: jest.fn().mockReturnThis(),
        version: jest.fn().mockReturnThis(),
        requiredOption: jest.fn().mockReturnThis(),
        option: jest.fn().mockReturnThis(),
        action: jest.fn().mockReturnThis(),
        addCommand: jest.fn().mockReturnThis(),
        parse: jest.fn().mockReturnThis(),
    };
});

jest.mock("commander", () => {
    return { Command: MockCommand };
});

const mockFunction = jest.fn();

jest.mock("./utils/commands", () => {
    return {
        commands: [
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

                action: mockFunction,
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

                action: mockFunction,
            },
        ],
    };
});

describe("init CLI", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    test("initializes cli and adds commands", () => {

        init();

        expect(MockCommand).toHaveBeenCalledTimes(3);

        // Initialzation of the cli
        const firstInstance = (MockCommand as jest.Mock).mock.results[0].value;

        // Initialization first command with required option
        const secondInstance = (MockCommand as jest.Mock).mock.results[1].value;

        // Initialization first command with required option
        const thirdInstance = (MockCommand as jest.Mock).mock.results[2].value;

        expect(firstInstance.name).toHaveBeenCalledWith("esh");
        expect(firstInstance.description).toHaveBeenCalledWith("Elastic search helper CLI");
        expect(firstInstance.version).toHaveBeenCalled();
        expect(firstInstance.addCommand).toHaveBeenCalledWith(secondInstance);
        expect(firstInstance.parse).toHaveBeenCalled();

        expect(secondInstance.name).toHaveBeenCalledWith("command");
        expect(secondInstance.description).toHaveBeenCalledWith("test description");
        expect(secondInstance.requiredOption).toHaveBeenCalledWith(
            "test flag",
            "location description"
        );
        expect(secondInstance.action).toHaveBeenCalledWith(mockFunction);
        expect(secondInstance.option).not.toHaveBeenCalled();

        expect(thirdInstance.name).toHaveBeenCalledWith("command 2");
        expect(thirdInstance.description).toHaveBeenCalledWith("test description 2");
        expect(thirdInstance.requiredOption).not.toHaveBeenCalled();
        expect(thirdInstance.action).toHaveBeenCalledWith(mockFunction);
        expect(thirdInstance.option).toHaveBeenCalledWith(
            "test flag 2",
            "location description 2"
        );

    });
});
