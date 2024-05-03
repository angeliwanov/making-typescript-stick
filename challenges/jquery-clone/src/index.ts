import fetch from "node-fetch";

class SelectorResult {
  #elements;
  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }

  html(contents: string) {
    //itterate over everything we found
    this.#elements.forEach((elem) => {
      //set contents to string we were given
      elem.innerHTML = contents;
    });
  }

  on<K extends keyof HTMLElementEventMap>(
    eventName: K,
    cb: (event: HTMLElementEventMap[K]) => void
  ) {
    this.#elements.forEach((elem) => {
      const htmlElem = elem as HTMLElement;
      htmlElem.addEventListener(eventName, cb);
    });
  }

  show() {
    this.#elements.forEach((elem) => {
      const htmlElem = elem as HTMLElement;
      htmlElem.style.visibility = "visible";
    });
  }

  hide() {
    this.#elements.forEach((elem) => {
      const htmlElem = elem as HTMLElement;
      htmlElem.style.visibility = "hidden";
    });
  }
}

function $(selector: string) {
  return new SelectorResult(document.querySelectorAll(selector));
}

namespace $ {
  export function ajax({
    url,
    success,
  }: {
    url: string;
    success: (data: any) => void;
  }): any {
    return fetch(url)
      .then((resp) => resp.json())
      .then(success);
  }
}

export default $;

$("button.continue").html("Next Step...");

const hiddenBox = $("#banner-message");
$("#button-container button").on("click", (event) => {
  hiddenBox.show();
});

$.ajax({
  url: "https://jsonplaceholder.typicode.com/posts/33",
  success: (result) => {
    $("#post-info").html("<strong>" + result.title + "</strong>" + result.body);
  },
});
