function $set(state: any, value: any) {
  return value;
}

function $push(state: Array<any>, value: Array<any>) {
  return state.concat(value);
}

function $unshift(state: Array<any>, value: Array<any>) {
  return value.concat(state);
}

function $merge(state: object, value: object) {
  return Object.assign(state, value);
}

function $apply(state: any, value: (state: any) => any) {
  try {
    return value(state);
  } catch (err) {
    throw new Error("Error in $apply given function to state");
  }
}

function $splice(state: any, value: Array<Array<number>>) {
  value.forEach(spliceArgs => {
    state.splice.apply(state, spliceArgs);
  });
  return state;
}

const updaterMapper: any = {
  $set,
  $push,
  $unshift,
  $merge,
  $apply,
  $splice
};

function update(state: any, updater: any) {
  for (let prop in updater) {
    const value = updater[prop];
    if (prop[0] === "$") {
      try {
        return updaterMapper[prop](state, value);
      } catch {
        throw new Error("Given setter is not defined");
      }
    } else {
      const newState = Object.assign({}, state);
      newState[prop] = update(newState[prop], updater[prop]);
      return newState;
    }
  }
}

export default update;
