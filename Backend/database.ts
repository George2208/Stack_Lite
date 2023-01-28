import { CreationOptional, Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes, ForeignKey } from 'sequelize'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare userID: CreationOptional<number>
    declare username: string
    declare password: string

    static initialize(sequelize: Sequelize) {
        this.init({
            userID: {
                type: DataTypes.INTEGER,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            username: DataTypes.STRING,
            password: DataTypes.STRING
        }, { sequelize, timestamps: false })
    }
}

export class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
    declare questionID: CreationOptional<number>
    declare userID: ForeignKey<number>
    declare title: string
    declare content: string
    declare date: number

    static initialize(sequelize: Sequelize) {
        this.init({
            questionID: {
                type: DataTypes.INTEGER,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            title: DataTypes.STRING,
            content: DataTypes.STRING,
            date: DataTypes.INTEGER
        }, { sequelize, timestamps: false })
    }
}

export class Answer extends Model<InferAttributes<Answer>, InferCreationAttributes<Answer>> {
    declare answerID: CreationOptional<number>
    declare userID: ForeignKey<number>
    declare questionID: ForeignKey<number>
    declare content: string
    declare accepted: boolean
    declare date: number

    static initialize(sequelize: Sequelize) {
        this.init({
            answerID: {
                type: DataTypes.INTEGER,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            content: DataTypes.STRING,
            accepted: DataTypes.BOOLEAN,
            date: DataTypes.INTEGER
        }, { sequelize, timestamps: false })
    }
}

export class Badge extends Model<InferAttributes<Badge>, InferCreationAttributes<Badge>> {
    declare badgeID: CreationOptional<number>
    declare userID: ForeignKey<number>
    declare badgeName: string
    declare badgeDescription: string

    static initialize(sequelize: Sequelize) {
        this.init({
            badgeID: {
                type: DataTypes.INTEGER,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            badgeName: DataTypes.STRING,
            badgeDescription: DataTypes.BOOLEAN
        }, { sequelize, timestamps: false })
    }
}

export class UserBadge extends Model<InferAttributes<UserBadge>, InferCreationAttributes<UserBadge>> {
    declare userID: ForeignKey<number>
    declare badgeID: ForeignKey<number>

    static initialize(sequelize: Sequelize) {
        this.init({
            userID: DataTypes.NUMBER,
            badgeID: DataTypes.NUMBER
        }, { sequelize, timestamps: false })
    }
}

export class QuestionLike extends Model<InferAttributes<QuestionLike>, InferCreationAttributes<QuestionLike>> {
    declare userID: ForeignKey<number>
    declare questionID: ForeignKey<number>
}

export class AnswerLike extends Model<InferAttributes<AnswerLike>, InferCreationAttributes<AnswerLike>> {
    declare userID: ForeignKey<number>
    declare answerID: ForeignKey<number>
}

export default async function connect(path: string) {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: undefined
    })

    User.initialize(sequelize)
    Question.initialize(sequelize)
    Answer.initialize(sequelize)
    Badge.initialize(sequelize)
    UserBadge.initialize(sequelize)

    // *********************************************
    User.hasMany(Question, {foreignKey: 'userID', onDelete: 'CASCADE'})
    Question.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'})

    Question.hasMany(Answer, {foreignKey: 'questionID', onDelete: 'CASCADE'})
    Answer.belongsTo(Question, {foreignKey: 'questionID', onDelete: 'CASCADE'})

    User.hasMany(UserBadge, {foreignKey: 'userID'})
    UserBadge.belongsTo(User, {foreignKey: 'userID'})
    Badge.hasMany(UserBadge, {foreignKey: 'badgeID'})
    UserBadge.belongsTo(Badge, {foreignKey: 'badgeID'})
    User.belongsToMany(Badge, { through: UserBadge, foreignKey: 'userID' });
    Badge.belongsToMany(User, { through: UserBadge, foreignKey: 'badgeID' });
    // *********************************************

    await sequelize.sync()
    console.log(`Database connected (${path})`)
}
