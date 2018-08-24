// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

let docs = [];
// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Do   look in subdirectories
  true,
  // Only include "_base-" prefixed .vue files
  /_base-[\w-]+\.md$/
)

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the PascalCase version of the component name
  const componentName =
    fileName
    // Remove the "./_" from the beginning
    .replace(/^\.\/_/, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
  console.log(componentName)
  docs.push('/docs/' + componentName)
})

debugger
