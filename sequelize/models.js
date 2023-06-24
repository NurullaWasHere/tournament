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
    card_name: {type: DataTypes.STRING},
    card_surname: {type: DataTypes.STRING},
    card_date: {type: DataTypes.STRING},
    card_number: {type: DataTypes.STRING},
    card_cvc: {type: DataTypes.STRING},
    swiftCode: {type: DataTypes.STRING},
    iban: {type: DataTypes.STRING},
    deleted : {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const contest = sequelize.define('contest', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING, defaultValue: "Upcoming"},
    prize: {type: DataTypes.STRING, defaultValue: "No prize"},
    priority: {type: DataTypes.STRING, defaultValue: "Low"},
    visibility: {type: DataTypes.STRING, defaultValue: "Public"},
    about: {type: DataTypes.STRING},
    startDate: {type: DataTypes.STRING, allowNull: false, defaultValue: String(new Date())},
    endDate: {type: DataTypes.STRING, allowNull: false},
    qrCode: {type: DataTypes.TEXT, allowNull: false},
    organizerId: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    key: {type: DataTypes.TEXT, unique: true, allowNull: false},
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

export const contestExpense = sequelize.define('contestExpenses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    amount: {type: DataTypes.INTEGER},
    price: {type: DataTypes.INTEGER},
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
    deleted : {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    imgUrl: {type: DataTypes.STRING},
    slug: {type: DataTypes.STRING},
})

export const participant = sequelize.define('participant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullname: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, defaultValue: "Участник"},
    play_number: {type: DataTypes.STRING, defaultValue: "Не определен"},
    payment_status: {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const invitedUser = sequelize.define('invited_user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: true},
})




User.hasMany(billingDetails)
billingDetails.belongsTo(User)

User.belongsToMany(contest, {through: UserContest})
contest.belongsToMany(User, {through: UserContest})

contest.hasMany(location)
location.belongsTo(contest)

category.hasMany(contest)
contest.belongsTo(category)

contest.hasMany(contestRequirements)
contestRequirements.belongsTo(contest)

contest.hasMany(contestExpense)
contestExpense.belongsTo(contest)

contest.hasMany(participant)
participant.belongsTo(contest)

contest.hasMany(team)
team.belongsTo(contest)

team.hasMany(invitedUser)
invitedUser.belongsTo(team)

contest.hasOne(billingDetails)
billingDetails.belongsTo(contest)

contest.hasMany(invitedUser)
invitedUser.belongsTo(contest)