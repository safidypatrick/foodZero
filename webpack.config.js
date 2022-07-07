const Encore = require('@symfony/webpack-encore');
var dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/app.js')

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    // .enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    .enableReactPreset()

    // Loading React env variables at build time.
    .configureDefinePlugin((options) => {
        const env = dotenv.config().parsed

        if (env.error) {
            throw env.error
        }

        // Get the root path.
        const currentPath = path.join(__dirname)

        // Create fallback path.
        const basePath = currentPath + '/.env'

        // Add the correct environment in path.
        const envPath = basePath + '.' + options['process.env']['NODE_ENV'].replace(/"(.+)"/g, '$1')

        // Check if the specified environment file exists.
        const finalPath = fs.existsSync(envPath) ? envPath : basePath

        // Set the path parameter in the dotenv config.
        const fileEnv = dotenv.config({ path: finalPath }).parsed

        // Finally add env vars.
        for (const property in fileEnv) {
            // Filter env vars by prefix to avoid passing sensitive symfony variables to front,
            // assuming  related vars are prefixed with REACT_APP_.
            if (property.substr(0, 10) === 'REACT_APP_') {
                options['process.env'][property] = JSON.stringify(fileEnv[property])
            }
        }
    })

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
;

let config = Encore.getWebpackConfig();

config.resolve.alias["@"] = path.resolve(__dirname, 'assets/');

module.exports = config