const emailButton = document.querySelector(".email");
const toast = document.querySelector(".toast");

if (emailButton && toast) {
  let hideTimer = 0;

  emailButton.addEventListener("click", async () => {
    const email = emailButton.dataset.email || emailButton.textContent.trim();
    let copied = false;

    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch {
      copied = copyWithFallback(email);
    }

    toast.textContent = copied ? "Email copied" : "Couldn't copy the email";
    toast.hidden = false;
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  });
}

function copyWithFallback(value) {
  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-999px";
  document.body.append(field);
  field.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  field.remove();
  return copied;
}
