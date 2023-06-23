import sequelize from './db.js'
import { DataTypes } from 'sequelize'

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    firstname: {type: DataTypes.STRING, allowNull: false},
    lastname: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING},
    age: {type: DataTypes.INTEGER},
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const billingDetails = sequelize.define('billingDetails', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    bankName: {type: DataTypes.STRING},
    cardDate: {type: DataTypes.STRING},
    cardNumber: {type: DataTypes.STRING},
    cardCVC: {type: DataTypes.STRING},
    swiftCode: {type: DataTypes.STRING},
    iban: {type: DataTypes.STRING},
    deleted : {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const contest = sequelize.define('contest', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    prize: {type: DataTypes.INTEGER},
    priority: {type: DataTypes.STRING},
    visibility: {type: DataTypes.STRING},
    about: {type: DataTypes.STRING},
    startDate: {type: DataTypes.STRING},
    endDate: {type: DataTypes.STRING},
    qrCode: {type: DataTypes.STRING},
    organizerId: {type: DataTypes.INTEGER},
    deleted : {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const location = sequelize.define('location', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    latitude: {type: DataTypes.STRING, allowNull: false},
    longitude: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    country: {type: DataTypes.STRING, defaultValue: "Kazakhstan"},
    deleted : {type: DataTypes.BOOLEAN, defaultValue: false},

})

export const contestRequirements = sequelize.define('contestInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mode: {type: DataTypes.STRING},
    participation: {type: DataTypes.STRING, defaultValue: "All"},
    gender: {type: DataTypes.STRING, defaultValue: "All"},
    minAge: {type: DataTypes.INTEGER , defaultValue: 5},
    maxAge: {type: DataTypes.INTEGER, defaultValue: 100},
    participantsLimit: {type: DataTypes.INTEGER, defaultValue: 100},
    fee: {type: DataTypes.INTEGER, defaultValue: 0},
    deleted : {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const overView = sequelize.define('overView', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, defaultValue: " "},
    authorId: {type: DataTypes.INTEGER, allowNull: false},
    deleted : {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const UserContest = sequelize.define('userContest', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    deleted : {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const team = sequelize.define('team', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING},
    info: {type: DataTypes.STRING},
    deleted : {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})


User.hasMany(billingDetails)
billingDetails.belongsTo(User)

User.belongsToMany(contest, {through: UserContest})
contest.belongsToMany(User, {through: UserContest})

contest.hasMany(location)
location.belongsTo(contest)

contest.hasMany(category)
category.belongsTo(contest)

contest.hasMany(contestRequirements)
contestRequirements.belongsTo(contest)

team.hasMany(User)
User.belongsTo(team)

