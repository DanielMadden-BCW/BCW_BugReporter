import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true },
    bug: { type: ObjectId, ref: 'Bug', required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    creatorEmail: { type: String, required: true }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
