module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            idTag: String,
            title: String,
            desc: String,
            place: String,
            dateBegin: Date,
            dateEnd: Date
        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Event = mongoose.model("event", schema);
    return Event;
};