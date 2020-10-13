#!/bin/bash
# updates src/import_commands.ts

# working directory
cd "$(dirname $0)/src"

imports=""
package_names=""
commands="./commands/*"
for command in $commands; do
    imports+="import $(basename $command .ts) from \"${command%.*}\";\n"
    package_names+="\tnew $(basename $command .ts),\n"
done

# cut off last comma and newline
package_names=${package_names%,*}

# assemble import_commands
out="$imports\rexport default [\n$package_names\n];"

# write non-empty lines
echo -e "$out" | awk 'NF' > "./import_commands.ts"