import {AST_NODE_TYPES, ESLintUtils} from "@typescript-eslint/utils";
import kebabCase from "lodash/kebabCase";

const DATA_TEST_ID = "data-testid";

export const onClick = ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        docs: {
            description: "Ensure data-testid is in kebab-case when onClick is present",
            recommended: false,
        },
        messages: {
            noTestId: "Elements with an onClick handler must have a data-testid attribute.",
            incorrectTestId: "The value of data-testid must be in kebab-case.",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        const onClickSelector = (attr: JSXAttribute) =>
            attr.type === AST_NODE_TYPES.JSXAttribute && attr.name.name === "onClick";
        const testIdSelector = (attr: JSXAttribute) =>
            attr.type === AST_NODE_TYPES.JSXAttribute && attr.name.name === DATA_TEST_ID;

        return {
            JSXOpeningElement: (node) => {
                const onClickAttr: JSXAttribute | null = node.attributes.find(onClickSelector) ?? null;
                if (!onClickAttr) return;

                const testIdAttr: JSXAttribute | null = node.attributes.find(testIdSelector) ?? null;
                if (!testIdAttr) {
                    context.report({
                        node,
                        messageId: "noTestId",
                    });
                    return;
                }

                const testIdValue = testIdAttr.value?.value;
                if (typeof testIdValue === "string" && kebabCase(testIdValue) !== testIdValue) {
                    context.report({
                        node,
                        messageId: "incorrectTestId",
                    });
                }
            },
        };
    },
});
