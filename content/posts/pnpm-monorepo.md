---
title: 使用 pnpm 构建 Monorepo 项目
summary: 文章介绍 Monorepo（单一代码库），阐述使用它的代码复用、版本管理优势，讲解实践中的安装依赖、启动和打包项目等操作，包括相关命令及项目结构示例，还给出了助力深入了解 Monorepo 的参考资料。
tag: 分享境
created: 2024-02-22 12:47:12
---

## 前言

许久以前就听闻了“Monoropo”这个名词，也大致明晰了其出现的意义与作用。但无奈自己的一些小项目暂时还用不上这种多项目存储库的形式，所以一直没有尝试去使用。

## Monorepo 是什么

Monorepo，即单一代码库，是指将多个相关的项目或模块的代码存放在一个统一的代码仓库中进行管理。

想象一下，一个大型的应用可能由多个子模块或功能组件组成，传统的方式可能会为每个子模块创建一个独立的代码仓库（MultiRepo）。
然而，Monorepo 则打破了这种分散的模式，将所有相关的代码都集中在一个地方。

## 为什么要使用 Monorepo

### 代码复用

在 Monorepo 中，由于所有的代码都在同一个仓库中，不同项目或模块之间共享代码变得极其容易。
当一个模块开发出了一个通用的功能或组件，其他模块可以直接引用和复用，无需重复开发。这大大提高了开发效率，减少了代码冗余。

比如说，在一个企业级的应用中，可能多个项目都需要使用相同的身份验证逻辑。在 Monorepo 下，只需要开发一次，然后各个项目直接引用即可。

### 版本管理

统一的版本管理是 Monorepo 的另一个显著优势。当对某个共享的模块进行更新或修复时，所有依赖于该模块的项目都能够立即受益于这个更新，确保了整个系统的一致性和稳定性。

假设一个底层的库进行了性能优化或 bug 修复，在 Monorepo 中，所有使用该库的项目在拉取最新代码时都能自动获得改进，无需逐个项目进行更新和部署。

## 开始实践

首先需要确保自己已经安装好 pnpm, 在终端执行以下命令安装 pnpm

```bash
npm install -g pnpm
```

创建一个新文件夹作为 Monorepo 的根目录，并`pnpm init`初始化仓库。

在根目录新建 pnpm-workspace.yaml，内容大致如下

```yaml
packages:
  - packages/**
```

- packages 是一个路径的数组，用来指定包含工作区包的目录。
- 通常子项目会统一放在 `root/packages/**` 目录下
- packages 可以指定多个目录

packages 通常作为多项目的存储路径，里面存放的一般是公共代码。在 pnpm 中，它会把 packages 下的子目录都看作一个项目。
另外，如果项目里有文档或者在线演示的项目（这些不属于核心库），放在 packages 里不是很合适，此时就可以按照下面的方式来配置 workspace。

```yaml
packages:
  - packages/**
  - docs
  - examples
```

### 安装依赖

有些依赖包需要全局安装，也就是安装到根目录，比如我们常用的编译依赖包 rollup、typescript 等

运行如下命令：

```bash
pnpm add rollup typescript -Dw
```

其中 -w 表示在 workspace 的根目录下安装而不是当前的目录

要为子包安装依赖，我们肯定不会傻傻 cd 到每个目录下，然后执行 pnpm install 来一个个安装依赖。pnpm 提供过滤参数 --filter 或 -F 指定命令作用范围。

假如我要在 utils 包下安装 dayjs, 我们可以执行以下命令

```bash
pnpm add dayjs -r --filter @monoremp/utils
```

假设现在写好了 utils 模块，`@monorepo/web` 准备使用 utils 模块，可以按照如下操作

```bash
pnpm -F @monorepo/web add @monorepo/utils@*
```

这个命令表示在 `@monorepo/web` 安装 `@monorepo/utils`，其中的 `@*` 表示默认同步最新版本。

之后，打开 packages/web/package.json 发现 dependencies 中多了一行

```json
{
  "name": "@monorepo/web",
  "version": "1.0.0",
  "description": "...",
  "main": "index.tsx",
  "scripts": {
    "dev": "vite"
  },
  "keywords": [],
  "author": "Hsinyau",
  "license": "ISC",
  "dependencies": {
    "@monorepo/utils": "workspace:^1.0.0"
  }
}
```

最终代码仓库的项目结构大致如下

```bash
monorepo
├── package.json
├── packages
│   ├── ui
│   │   ├── index.tsx
│   │   └── package.json
│   ├── web
│   │   ├── index.ts
│   │   ├── ...
│   │   └── package.json
│   ├── utils
│   │   ├── index.ts
│   │   ├── ...
│   │   └── package.json
├── docs
│   │   ├── index.ts
│   │   ├── index.md
│   │   └── package.json
├── examples
│   │   ├── astro
│   │   ├── react
│   │   └── vue
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json
```

## 启动和打包项目

在根目录编写 npm scripts 如下所示

```json
"scripts": {
  "postinstall": "pnpm run build",
  "build:ui": "pnpm -C packages/ui run build",
  "build:utils": "pnpm -C packages/utils run build",
  "build": "turbo run build",
  "dev:web": "pnpm -C packages/web dev",
  "...": "..."
}
```

其中，"-C path" 表示在指定的“path”路径下运行 npm 脚本，而不是在当前的工作路径下进行。

例如，在根目录下执行 "pnpm dev:web"，将会执行 "packages/web/package.json" 中的 "dev" 脚本。

## 参考

[工作空间（Workspace） | pnpm](https://pnpm.io/zh/workspaces){target="_blank"}

[pnpm cli | pnpm](https://pnpm.io/pnpm-cli#-c-path---dir-path){target="_blank"}

[Create a monorepo using PNPM workspace](https://dev.to/vinomanick/create-a-monorepo-using-pnpm-workspace-1ebn){target="_blank"}
