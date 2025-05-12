const fsPromises = require('fs/promises')
const path = require('path')
const { PurgeCSS } = require('purgecss')

const angularPurgeCSS = async () => {
    const pkgDir = await import('pkg-dir')
    const rootDir = await pkgDir.packageDirectory(process.cwd())
    if (!rootDir) {
        // ERROR not in npm project
        console.error('Error: Needs to be run inside an npm project')
    }
    console.log('Running PurgeCSS')
    console.log('TEST PATH: ' + path.resolve(rootDir, 'angular.json'))
    const angularJsonBuffer = await fsPromises.readFile(
        path.resolve(rootDir, 'angular.json')
    )
    // ERROR no angular.json file found, try catch
    console.log('Read angular.json')
    const angularJson = JSON.parse(angularJsonBuffer.toString())
    const projectName = Object.keys(angularJson.projects)[0]
    const outputPath =
        angularJson.projects[projectName].architect.build.options.outputPath
    console.log(outputPath)
    let clientPath
    if (typeof outputPath === 'string') {
        clientPath = path.resolve(rootDir, outputPath)
        if (
            angularJson.projects[projectName].architect.build.builder ===
            '@angular-devkit/build-angular:application'
        ) {
            clientPath = path.join(clientPath, 'browser')
        }
    } else if (typeof outputPath === 'object') {
        clientPath = path.resolve(rootDir, outputPath.base, outputPath.browser)
        console.log(clientPath)
    }
    console.log(clientPath)
    clientPath =
        '/Users/robertbarbu/Coding/App/WebApp/.firebase/application-b607e/hosting'
    const files = await fsPromises.readdir(clientPath)
    let cssFile = ''
    for (let file of files) {
        if (file.match(/\.css$/)) {
            cssFile = file
        }
    }
    const initialFileContent = await fsPromises.readFile(
        path.join(clientPath, cssFile)
    )
    const initialFileSize = initialFileContent.length / 1000
    console.log(`⚠ Purging ${cssFile} ...`)
    const purgeCSSResult = await new PurgeCSS().purge({
        content: [
            path.join(clientPath.toString(), 'index.html'),
            path.join(clientPath, '*.js'),
        ],
        css: [path.join(clientPath.toString(), cssFile)],
        variables: true,
    })
    await fsPromises.writeFile(
        path.join(clientPath, cssFile),
        purgeCSSResult[0].css
    )
    const newFileSize = purgeCSSResult[0].css.length / 1000
    console.log('✓ CSS purged successfully')
    console.log(`Initial '${cssFile}' size:`, initialFileSize, 'kb')
    console.log(`New '${cssFile}' size:`, newFileSize, 'kb')
}

angularPurgeCSS().then(() => {})
