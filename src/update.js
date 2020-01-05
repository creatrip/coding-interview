function update(state, updater) {
  for (let prop in updater) {
    const value = updater[prop];
    if (prop[0] === "$") {
      switch (prop) {
        case "$set": {
          return value;
        }
        case "$push": {
          if (!Array.isArray(state)) {
            throw new Error("Given state is unsupported type for $push");
          } else {
            return state.concat(value);
          }
        }
        default: {
          console.log("given setter not defined");
          return state;
        }
      }
    } else {
      console.log("traverse");
    }
  }
}

exports.update = update;
