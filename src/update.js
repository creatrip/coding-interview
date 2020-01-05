function update(state, updater) {
  for (let prop of update) {
    if (prop[0] === "$") {
      console.log("do something");
    } else {
      console.log("traverse");
    }
  }
}

exports.update = update;
