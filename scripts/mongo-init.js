/* global db */

const dbName = 'insidetechsoft'
const database = db.getSiblingDB(dbName)

function ensureCollection(name, validator) {
  const exists = database.getCollectionNames().includes(name)

  if (!exists) {
    database.createCollection(name, {
      validator,
      validationLevel: 'moderate',
      validationAction: 'warn',
    })
    return
  }

  database.runCommand({
    collMod: name,
    validator,
    validationLevel: 'moderate',
    validationAction: 'warn',
  })
}

ensureCollection('teamMembers', {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'role', 'image', 'isActive'],
    properties: {
      name: { bsonType: 'string' },
      role: { bsonType: 'string' },
      image: { bsonType: 'string' },
      linkedin: { bsonType: 'string' },
      order: { bsonType: ['int', 'long', 'double', 'decimal'] },
      isActive: { bsonType: 'bool' },
      createdAt: { bsonType: 'date' },
      updatedAt: { bsonType: 'date' },
    },
  },
})

ensureCollection('contactQueries', {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'email', 'message'],
    properties: {
      name: { bsonType: 'string' },
      email: { bsonType: 'string' },
      phone: { bsonType: 'string' },
      website: { bsonType: 'string' },
      message: { bsonType: 'string' },
      createdAt: { bsonType: 'date' },
    },
  },
})

ensureCollection('users', {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'email', 'password', 'role'],
    properties: {
      name: { bsonType: 'string' },
      email: { bsonType: 'string' },
      password: { bsonType: 'string' },
      role: { enum: ['admin', 'user'] },
      createdAt: { bsonType: 'date' },
    },
  },
})

ensureCollection('blogs', {
  $jsonSchema: {
    bsonType: 'object',
    required: ['title', 'slug', 'content', 'author'],
    properties: {
      title: { bsonType: 'string' },
      slug: { bsonType: 'string' },
      content: { bsonType: 'string' },
      author: { bsonType: 'objectId' },
      image: { bsonType: 'string' },
      tags: { bsonType: 'array', items: { bsonType: 'string' } },
      createdAt: { bsonType: 'date' },
      updatedAt: { bsonType: 'date' },
    },
  },
})

ensureCollection('newsletterSubscribers', {
  $jsonSchema: {
    bsonType: 'object',
    required: ['email', 'subscribedAt'],
    properties: {
      email: { bsonType: 'string' },
      subscribedAt: { bsonType: 'date' },
    },
  },
})

ensureCollection('comments', {
  $jsonSchema: {
    bsonType: 'object',
    required: ['blogId', 'userName', 'comment'],
    properties: {
      blogId: { bsonType: 'objectId' },
      userName: { bsonType: 'string' },
      comment: { bsonType: 'string' },
      createdAt: { bsonType: 'date' },
    },
  },
})

database.teamMembers.createIndex({ isActive: 1, order: 1, createdAt: -1 })
database.contactQueries.createIndex({ createdAt: -1 })
database.contactQueries.createIndex({ email: 1, createdAt: -1 })
database.users.createIndex({ email: 1 }, { unique: true })
database.blogs.createIndex({ slug: 1 }, { unique: true })
database.blogs.createIndex({ author: 1 })
database.blogs.createIndex({ tags: 1 })
database.newsletterSubscribers.createIndex({ email: 1 }, { unique: true })
database.comments.createIndex({ blogId: 1, createdAt: -1 })

print(`MongoDB database "${dbName}" is ready.`)
