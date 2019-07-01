const inquirer = require('inquirer');
const stripchar = require('stripchar').StripChar;
const dbmodel = require('./templades/DbModel')
const route = require('./templades/Route')
const inputFormat = require('./templades/InputFormat')
const controller = require('./templades/Controller')

generator()


async function generator() {
    var routeName = await getName("What's the name of route (Example: car)?: ");
    var varsAndTypes = await getVars();

    dbmodel.createDbModel(routeName, varsAndTypes);
    route.createRoute(routeName);
    inputFormat.createInputFormat(routeName)
    controller.createController(routeName,varsAndTypes)


}


async function getVars() {

    const variables = [];
    do {
        var varName = await getName("What's the name of variable?")
        var questionVarType = [{
            type: 'rawlist',
            name: 'varType',
            choices: ['String', 'Number', 'Date', 'Buffer', 'Boolean', 'Mixed', 'ObjectId', 'Array', 'Decimal128', 'Map'],
            message: "Whats's the variable type."
        }]

        var varType = await inquirer.prompt(questionVarType).then(res => res['varType'])
        variables.push([varName, varType])
        var addOtherVar = [{
            type: 'confirm',
            name: 'addVar',
            message: "You wish add other variable?."
        }]
        var seguir = await inquirer.prompt(addOtherVar).then(res => res['addVar'])
    } while (seguir)
    return variables;
}

async function getName(message) {
    var questionName = [{
        type: 'input',
        name: 'name',
        message: message
    }]

    do {
        var name = await inquirer.prompt(questionName).then(answers => answers['name'])
        if (!isNaN(name) ||
            stripchar.RSExceptUnsAlpNum(name) != name ||
            reservedWords.includes(name)
        ) {
            console.log('It must be string, not contain symbols or reserved words of the language');
            var seguir = true;
        } else {
            var seguir = false;
        }
    } while (seguir)

    return name.toLowerCase();
}



const reservedWords = ['break', 'case', 'class', 'catch', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'enum', 'implements', 'package', 'protected', 'static', 'interface', 'private', 'public', 'abstract', 'boolean', 'byte', 'char', 'double', 'final', 'float', 'goto', 'int', 'long', 'native', 'short', 'synchronized', 'transient', 'volatile']