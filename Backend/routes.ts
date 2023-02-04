import { Model } from "sequelize"
import { Answer, Badge, Question, User } from "./database"

function print(x: any) {
    if(x instanceof Model)
        console.log(x.dataValues)
    else
        console.log(x)
}

async function getAccount(username: string, password: string): Promise<User> {
    const user = await User.findOne({where: {username}})
    if(user === null)
        throw new Error(`No account with username ${username} found`)
    if(user.password !== password)
        throw new Error(`Passwords do not match`)
    return user
}

export namespace GetRoutes {
    export async function data() {
        return {
            Users: await User.findAll(),
            Questions: await Question.findAll(),
            Answers: await Answer.findAll(),
            Badges: await Badge.findAll()
        }
    }
    export async function questions() {
        return await Question.findAll({raw: true})
    }
}

export namespace PostRoutes {
    export async function register(data: {username: string, password: string}) {
        if(await User.findOne({where: {username: data.username}}) !== null)
            throw new Error("Username already taken")
        print(await User.create({
            username: data.username,
            password: data.password
        }))
        return `Registered as ${data.username}`
    }
    export async function login(data: {username: string, password: string}) {
        if(await User.findOne({where: {username: data.username, password: data.password}}) === null)
            return false
        return true
    }
    export async function createQuestion(data: {username: string, password: string, title: string, content: string}) {
        const user = await getAccount(data.username, data.password)
        const question = await Question.create({
            userID: user.userID,
            title: data.title,
            content: data.content,
            date: Date.now()
        })
        print(question)
        return question.dataValues
    }
    export async function createAnswer(data: {username: string, password: string, questionID: number, content: string}) {
        const user = await getAccount(data.username, data.password)
        if(await Question.findOne({where: {questionID: data.questionID}}) === null)
            throw new Error(`No question with id ${data.questionID}`)
        const answer = await Answer.create({
            userID: user.userID,
            questionID: data.questionID,
            content: data.content,
            accepted: false,
            date: Date.now()
        })
        print(answer)
        return answer.dataValues
    }
}

export namespace DeleteRoutes {
    export async function user(data: {username: string, password: string}) {
        const user = await getAccount(data.username, data.password)
        await user.destroy()
        return `User deleted`
    }
    export async function question(data: {username: string, password: string, questionID: number}) {
        const user = await getAccount(data.username, data.password)
        const question = await Question.findByPk(data.questionID)
        if(question === null)
            throw new Error(`No question with id ${data.questionID}`)
        if(question.userID !== user.userID)
            throw new Error(`You cannot delete another user's question`)
        await question.destroy()
        return `Question deleted`
    }
    export async function answer(data: {username: string, password: string, answerID: number}) {
        const user = await getAccount(data.username, data.password)
        const answer = await Answer.findByPk(data.answerID)
        if(answer === null)
            throw new Error(`No answer with id ${data.answerID}`)
        if(answer.userID !== user.userID)
            throw new Error(`You cannot delete another user's answer`)
        await answer.destroy()
        return `Answer deleted`
    }
}