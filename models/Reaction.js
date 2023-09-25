// Defining the schema for a Reaction
const ReactionSchema = new Schema({
    // reactionId will store a unique identifier for the reaction
    reactionId: { //just a name
      type: Schema.Types.ObjectId, //now it has id as object
      default: () => new Types.ObjectId() //new reaction >>> new object id
    },
    // reactionBody field is required, of type String, and has a maximum length of 280 characters
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    // username field is required and of type String. It stores the username of the user who created the reaction.
    username: {
      type: String,
      required: true
    },
    // createdAt field will store the date when the reaction was created. It defaults to the current date and time.
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal) // Formatting the date value
    }
  });
  
// how it look like in database on original thought and reaction

  //{"_id": "60d5ec49a9c1a2432347643a",
 // "username": "Alice",
  //"thoughtText": "Enjoying a beautiful sunset at the beach! 🌅",
  //"createdAt": "2023-09-23T18:30:00.000Z",
  //"reactions": [

      //"reactionId": "60d5ec4fa9c1a2432347643b",
      //"username": "Bob",
      //"reactionBody": "Wow, that sounds amazing! 😍",
      //"createdAt": "2023-09-23T18:35:00.000Z"

