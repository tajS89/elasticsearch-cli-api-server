
const mockCommand = jest.fn().mockImplementation(() => {
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


const mockFunction = jest.fn();

export { mockFunction, mockCommand };
