import  mongoose, { Schema } from 'mongoose';
import  mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    videoFile: {
        type: String,//Cloudinary URL
        required: true
    },
    duration: {
        type: Number, // cloudinary duration 
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublish: {
        type: Boolean,
        default: true
    }, 
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
})

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model('Video', videoSchema);