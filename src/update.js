function update(state, updater) {
  console.log(updater);
  for (let prop in updater) {
    if (prop[0] === "$") {
      switch (prop) {
        case "$set": {
          return updater[prop];
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
