let width;
let height;

function updateBounds(w, h) {
    width = w;
    height = h;
}

function checkBounds(d, nodeRadius) {
  let x_right = d.x + nodeRadius;
  let x_left = d.x - nodeRadius;
  let y_bottom = d.y + nodeRadius;
  let y_top = d.y - nodeRadius;

  if (x_right > width / 2) d.x = width / 2 - nodeRadius;
  if (x_left < -width / 2) d.x = -width / 2 + nodeRadius;
  if (y_bottom > height / 2) d.y = height / 2 - nodeRadius;
  if (y_top < -height / 2) d.y = -height / 2 + nodeRadius;
};

export { checkBounds, updateBounds };
