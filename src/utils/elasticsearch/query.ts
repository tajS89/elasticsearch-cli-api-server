export const query = (searchTerm: string) => ({
    function_score: {
        query: {
            nested: {
                path: "relationships",
                query: {
                    term: {
                        "relationships.cause_concept_name": searchTerm,
                    },
                },
            },
        },
        functions: [
            {
                filter: { term: { title: searchTerm } },
                weight: 1,
            },
            {
                filter: { term: { tags: searchTerm } },
                weight: 0.51,
            },
            {
                filter: { term: { abstract: searchTerm } },
                weight: 0.1,
            },
            {
                filter: {
                    bool: {
                        must_not: [
                            { term: { title: searchTerm } },
                            { term: { tags: searchTerm } },
                            { term: { abstract: searchTerm } },
                        ],
                    },
                },
                weight: 0.001,
            },
        ],
        score_mode: "sum",
        boost_mode: "replace",
    },
});