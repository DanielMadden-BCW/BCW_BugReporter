import { Schema } from 'mongoose'

const BugSchema = new Schema(
  {
    closed: { type: Number, default: 0 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)

BugSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default BugSchema
