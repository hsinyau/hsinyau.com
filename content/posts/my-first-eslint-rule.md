---
title: 构建我的第一个自定义 ESLint 规则
tag: 分享境
summary: 本文介绍了如何构建自定义 ESLint 规则，包括编写规则、使用规则和调试规则等方面。ESLint 是一个流行的 JavaScript 代码检查工具，它支持自定义规则，可以帮助开发者提高代码质量和一致性。要编写自定义规则，需要了解 ESLint 的工作原理和规则结构，创建一个 JavaScript 文件，并导出一个规则对象。在使用自定义规则时，需要将规则文件作为插件导入，并将规则名称添加到 rules 属性中。在开发自定义规则时，可以使用一些常用的调试技巧来查找问题。通过使用自定义规则，可以确保代码符合特定的标准和规范，提高代码质量和可维护性。
created: 2022-12-19 09:59:45
cover: https://bu.dusays.com/2024/06/28/667e501f0af3a.webp
---

在我学习 React、Vue 或更普遍地使用 Javascript、TypeScript 时，我经常使用 ESLint 来进行 linting。
虽然我已经非常熟悉如何使用和配置这个工具，但是直到最近，我才真正意义上从头开始编写自定义 ESLint 规则，在此期间我会了我很多东西。
这就是本文的内容：我如何构建自定义规则、如何学习“抽象语法树”，以及一些实用技巧和建议。

## ESLint
ESLint 是一个流行的 JavaScript 代码检查工具，它可以帮助开发者提高代码质量和一致性。
ESLint 的强大之处在于它支持自定义规则，开发者可以通过自定义规则来确保代码符合特定的标准和规范。

## 准备工作
在开始构建自定义规则之前，你需要确保你的开发环境中已经安装了 ESLint，并且你已经熟悉了如何在项目中使用 ESLint。

此外，你还需要了解 ESLint 的工作原理和规则结构。ESLint 通过解析代码，构建抽象语法树（AST），并在 AST 上应用规则来进行代码检查。
每个规则都是一个 JavaScript 函数，它接受一个 AST 节点作为参数，检查该节点是否符合规则。

## 编写规则
要编写自定义规则，你需要创建一个 JavaScript 文件，并导出一个规则对象。
规则对象包含一个或多个规则定义，每个规则定义都是一个 JavaScript 函数。

以下是一个简单的规则定义示例，它检查变量名是否符合 camelCase 命名规范：

```javascript
module.exports = {
  rules: {
    camelcase: {
      meta: {
        docs: {
          description: '强制执行驼峰命名约定',
          category: 'Stylistic Issues',
          recommended: true,
        },
        schema: [],
        messages: {
          camelcase: '\'{{name}}\' must be in camel case',
        },
      },
      create(context) {
        function checkVariable(node) {
          const name = node.name
          if (!/^[a-z][a-zA-Z0-9]*$/.test(name)) {
            context.report({
              node,
              messageId: 'camelcase',
              data: {
                name,
              },
            })
          }
        }
        return {
          Identifier: checkVariable,
        }
      },
    },
  },
}
```

在上述代码中，module.exports 导出一个包含 camelcase 规则的规则对象。该规则对象包含两个属性：

- `meta`: 包含有关规则的元数据，例如规则名称、描述、分类等。
- `create`: 是一个函数，它接受一个上下文对象作为参数，该对象包含了与当前文件有关的信息，例如 AST、解析器选项等。该函数返回一个对象，该对象包含一个或多个节点类型和与之关联的检查函数。
在 checkVariable 函数中，我们首先获取节点的名称，并使用正则表达式检查该名称是否符合 camelCase 命名规范。如果名称不符合规范，我们就调用 context.report 函数报告错误，并提供有关错误的信息。

## 使用规则

要使用自定义规则，你需要将其添加到 ESLint 配置文件中(.eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json)。
具体来说，你需要将规则文件作为插件导入，并将规则名称添加到 rules 属性中。以下是一个示例配置文件：

```json
module.exports = {
  plugins: ['my-plugin'],
  rules: {
    'my-plugin/camelcase': 'error',
  },
};
```

在上述配置文件中，我们通过 plugins 属性导入了名为 my-plugin 的插件，然后将 camelcase 规则添加到 rules 属性中。
我们将规则的严重程度设置为 'error'，这意味着任何不符合规则的代码都将被报告为错误。

## 调试规则

在开发自定义规则时，你可能需要调试规则以查找问题。以下是一些常用的调试技巧：

在规则代码中使用 `console.log` 或 `debugger` 语句来输出调试信息或中断程序执行。
使用 ESLint 的 `--debug` 命令行选项来打印出详细的调试信息。
使用 VS Code 或其他编辑器中的调试器来在规则代码中设置断点并逐步执行代码。

## 总结

自定义 ESLint 规则可以帮助你确保代码符合特定的标准和规范。虽然本文只提供了一个简单的规则示例，但是你可以使用更复杂的规则来检查代码中的各种问题。例如，你可以检查代码中的代码风格、错误处理、性能问题等。通过使用自定义规则，你可以确保你的代码始终符合最佳实践和标准，从而提高代码质量和可维护性。

## 参考

[Find and fix problems in your JavaScript code - ESLint - Pluggable JavaScript Linter](https://eslint.org/)
[配置规则 - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/use/configure)
