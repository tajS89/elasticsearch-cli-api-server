
import { commands } from "../data/init-cli-data";
import { mockCommand, mockFunction } from "./../mocks/init-cli.mock";
import { init } from "src/cli/init-cli";

jest.mock("commander", () => {
    return { Command: mockCommand };
});

jest.mock("src/cli/commands", () => {
    return {
        commands: commands.map(cmd => ({ ...cmd, action: mockFunction })),
    };
});

describe("init CLI", () => {

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    test("should initializes cli and adds commands", () => {

        init();

        expect(mockCommand).toHaveBeenCalledTimes(3);

        // Initialzation of the cli
        const firstInstance = (mockCommand as jest.Mock).mock.results[0].value;

        // Initialization of first command with required option
        const secondInstance = (mockCommand as jest.Mock).mock.results[1].value;

        // Initialization of second command without required option
        const thirdInstance = (mockCommand as jest.Mock).mock.results[2].value;

        expect(firstInstance.name).toHaveBeenCalledWith("esh");
        expect(firstInstance.description).toHaveBeenCalledWith("Elastic search helper CLI");
        expect(firstInstance.version).toHaveBeenCalled();
        expect(firstInstance.addCommand).toHaveBeenCalledWith(secondInstance);
        expect(firstInstance.parse).toHaveBeenCalled();

        expect(secondInstance.name).toHaveBeenCalledWith("upload");
        expect(secondInstance.description).toHaveBeenCalledWith("test description");
        expect(secondInstance.requiredOption).toHaveBeenCalledWith(
            "test flag",
            "location description"
        );
        expect(secondInstance.action).toHaveBeenCalledWith(mockFunction);
        expect(secondInstance.option).not.toHaveBeenCalled();

        expect(thirdInstance.name).toHaveBeenCalledWith("upload");
        expect(thirdInstance.description).toHaveBeenCalledWith("test description 2");
        expect(thirdInstance.requiredOption).not.toHaveBeenCalled();
        expect(thirdInstance.action).toHaveBeenCalledWith(mockFunction);
        expect(thirdInstance.option).toHaveBeenCalledWith(
            "test flag 2",
            "location description 2"
        );

    });
});
