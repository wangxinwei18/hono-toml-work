# 解决隐藏 wrangler.toml 文件值的问题

首次运行 wrangler deploy
export CLOUDFLARE_ACCOUNT_ID="d43b8b995376752be4e89c53c33b83ec"

注意：环境变量只能通过 wrangler.toml 在[vars]下方定义的变量和值才能在 wrangler deploy 时部署到 cloudflare 上去。
如果定义在其它部分无法上传到 cloudflare 上。
要将 config.toml 中的变量替换结果注入到 wrangler.toml，
可以使用 envsubst 工具进行预处理。以下是详细步骤：

安装 envsubst：

Debian/Ubuntu：

bash
复制代码
sudo apt-get install gettext
自动生成 wrangler.toml,键入如下命令：

 source ~/.bashrc

 envsubst < wrangler.template.toml > wrangler.toml

是的，您可以通过将环境变量存储在文件中，然后使用 envsubst 工具将这些变量注入到 wrangler.toml 文件中。以下是详细步骤：

创建包含环境变量的文件：

首先，创建一个文件（例如 env_vars.sh），在其中定义所需的环境变量：

bash
复制代码
export WORKER_NAME="my-hono-worker"
export ACCOUNT_ID="your_account_id"
export COMPATIBILITY_DATE="2025-01-03"
export DB_HOST="localhost"
export DB_PORT="5432"
export DB_USER="admin"
export DB_PASS="password123"
编写 wrangler.template.toml 模板文件：

在 wrangler.template.toml 中，使用占位符表示需要替换的变量：

toml
复制代码
name = "${WORKER_NAME}"
type = "javascript"
account_id = "${ACCOUNT_ID}"
workers_dev = true
compatibility_date = "${COMPATIBILITY_DATE}"

[vars]
DB_HOST = "${DB_HOST}"
DB_PORT = "${DB_PORT}"
DB_USER = "${DB_USER}"
DB_PASS = "${DB_PASS}"
加载环境变量并生成 wrangler.toml 文件：

在终端中，执行以下命令以加载环境变量并使用 envsubst 生成最终的 wrangler.toml 文件：

bash
复制代码

加载环境变量

source env_vars.sh

 使用 envsubst 进行替换并生成 wrangler.toml

envsubst < wrangler.template.toml > wrangler.toml
这将创建一个包含实际配置的 wrangler.toml 文件，其中模板中的占位符已被替换为 env_vars.sh 中定义的环境变量值。

注意事项：

安全性：确保 env_vars.sh 文件的权限设置为仅限必要的用户访问，以防止敏感信息泄露。

自动化：可以将上述命令添加到构建或部署脚本中，以实现自动化配置生成。

环境变量文件格式：env_vars.sh 文件中的每一行都应以 export 开头，以确保变量在当前 shell 环境中可用。

通过这种方法，您可以方便地将存储在文件中的环境变量注入到 wrangler.toml，实现配置的动态管理。

源

You said:

 使用 envsubst 进行替换并生成 wrangler.toml

envsubst < wrangler.template.toml > wrangler.toml
解释上面命令的流程
ChatGPT said:
ChatGPT
您提到的命令 envsubst < wrangler.template.toml > wrangler.toml 的作用是将 wrangler.template.toml 文件中的环境变量占位符替换为当前环境变量的实际值，并将结果输出到 wrangler.toml 文件中。

命令解析：

envsubst：这是一个用于环境变量替换的命令行工具。它会扫描输入内容，找到形如 $VARIABLE 或 ${VARIABLE} 的占位符，并用当前环境中对应的变量值进行替换。

< wrangler.template.toml：这部分表示将 wrangler.template.toml 文件的内容作为 envsubst 的输入。

> wrangler.toml：这部分表示将 envsubst 的输出重定向到 wrangler.toml 文件中。如果该文件不存在，将会创建；如果已存在，则会被覆盖。

执行流程：

读取模板文件：envsubst 读取 wrangler.template.toml 文件的内容。

替换变量：在读取的内容中，envsubst 查找所有符合 $VARIABLE 或 ${VARIABLE} 格式的占位符，并用当前环境变量的值进行替换。如果某个占位符在环境变量中没有对应的值，则该占位符会被替换为空字符串。

输出结果：替换后的内容通过标准输出（stdout）传递。

重定向输出：使用 > 操作符，将标准输出的内容写入到 wrangler.toml 文件中。

注意事项：

环境变量的定义：在运行此命令之前，确保所有在模板文件中引用的环境变量都已在当前 shell 环境中定义。可以通过 export VARIABLE_NAME=value 的方式设置。

占位符格式：模板文件中的占位符应采用 $VARIABLE 或 ${VARIABLE} 的格式，以便 envsubst 正确识别并替换。

文件权限：确保您有权限读取 wrangler.template.toml 文件并写入 wrangler.toml 文件。

通过上述流程，您可以将模板文件中的占位符替换为实际的环境变量值，生成最终的配置文件 wrangler.toml。
