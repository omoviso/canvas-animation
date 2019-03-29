let samples = { starfall: false };

function startTransition(e) {
  let clicked = e.target.tagName == "SPAN" ? e.target.parentNode : e.target;
  let content = document.querySelector(".content");
  let cover = document.querySelector(".cover");
  let avatar = document.querySelector("div.avatar");
  cover.style.display = "block";
  let back = document.querySelector(".back");
  back.addEventListener("click", createBackEvent);
  let isSample = clicked.classList.contains("sample");
  if (isSample) {
    samples[clicked.dataset.sample] = true;
  }
  function createBackEvent() {
    hideContentTimer = setInterval(backToMenu, 16);
  }
  let infoParts = document.querySelectorAll("div.section");

  let sectionUnclicked = { opacity: 1, top: 0 };
  let sectionClicked = {
    opacity: 1,
    baseLeft: clicked.getBoundingClientRect().left,
    baseTop: clicked.getBoundingClientRect().top,
    posLeft: 0,
    posTop: 0
  };
  let contentExpand = {
    opacity: 0,
    width: clicked.getBoundingClientRect().width,
    height: clicked.getBoundingClientRect().height,
    leftMargin: 30,
    topMargin: 35
  };
  let backOpacity = 0;

  let fadeUnclickedTimer = setInterval(fadeUnclicked, 16);
  let moveClickedTimer;
  let showContentTimer;
  let hideContentTimer;
  let showSectionTimer;

  function fadeUnclicked() {
    infoParts.forEach(info => {
      if (info != clicked || isSample) {
        info.style.opacity = sectionUnclicked.opacity;
        info.style.top = `${sectionUnclicked.top}px`;
      }
    });

    avatar.style.opacity = sectionUnclicked.opacity;

    if (sectionUnclicked.opacity > 0) {
      sectionUnclicked.opacity -= 0.08;
      sectionUnclicked.top--;
    } else {
      sectionUnclicked.opacity = 0;
      if (!isSample) {
        moveClickedTimer = setInterval(moveClicked, 16);
      } else {
        showContentTimer = setInterval(showContent, 16);
      }
      clearInterval(fadeUnclickedTimer);
    }
  }

  function moveClicked() {
    let moveLeft =
      Math.abs(contentExpand.leftMargin - sectionClicked.baseLeft) / 10;
    let moveTop =
      Math.abs(contentExpand.topMargin - sectionClicked.baseTop) / 10;
    if (
      clicked.getBoundingClientRect().left >
      contentExpand.leftMargin + moveLeft
    ) {
      sectionClicked.posLeft -= moveLeft;
    } else {
      sectionClicked.posLeft =
        contentExpand.leftMargin - sectionClicked.baseLeft;
    }
    if (
      clicked.getBoundingClientRect().top >
      contentExpand.topMargin + moveTop
    ) {
      sectionClicked.posTop -= moveTop;
    } else {
      sectionClicked.posTop = contentExpand.topMargin - sectionClicked.baseTop;
    }
    if (
      sectionClicked.posTop ==
        contentExpand.topMargin - sectionClicked.baseTop &&
      sectionClicked.posLeft ==
        contentExpand.leftMargin - sectionClicked.baseLeft
    ) {
      content.style.cssText = `left: ${contentExpand.leftMargin}px; 
									 top: ${contentExpand.topMargin}px;
									 width: ${clicked.getBoundingClientRect().width}px;
									 height: ${clicked.getBoundingClientRect().height}px`;
      content.style.display = "block";
    }
    sectionClicked.opacity > 0
      ? (sectionClicked.opacity -= 0.2)
      : (sectionClicked.opacity = 0);

    clicked.style.left = `${sectionClicked.posLeft}px`;
    clicked.style.top = `${sectionClicked.posTop}px`;
    clicked.firstElementChild.style.opacity = sectionClicked.opacity;

    if (
      sectionClicked.opacity == 0 &&
      sectionClicked.posLeft ==
        contentExpand.leftMargin - sectionClicked.baseLeft
    ) {
      clearInterval(moveClickedTimer);
      document.querySelectorAll("div.section").forEach(info => {
        info.style.left = 0;
        info.style.display = "none";
        info.style.top = `${sectionUnclicked.top}px`;
        clicked.firstElementChild.style.opacity = 1;
      });
      showContentTimer = setInterval(showContent, 16);
    }
  }

  function showContent() {
    let speed = 50;
    let contentMarginTop = 30;
    let maxWidth =
      clicked.parentNode.getBoundingClientRect().width -
      contentExpand.leftMargin * 2;
    let maxHeight =
      clicked.parentNode.getBoundingClientRect().height -
      contentMarginTop * 2.5;

    if (contentExpand.width < maxWidth) {
      contentExpand.width += speed;
    } else {
      content.style.overflow = "auto";
      contentExpand.width = maxWidth;
    }

    if (contentExpand.height < maxHeight) {
      contentExpand.height += speed;
    } else {
      content.style.overflow = "auto";
      contentExpand.height = maxHeight;
    }
    if (!isSample) {
      contentExpand.opacity < 1
        ? (contentExpand.opacity += 0.03)
        : (contentExpand.opacity = 1);
    } else {
      contentExpand.opacity = 0;
    }
    content.style.width = `${contentExpand.width}px`;
    content.style.height = `${contentExpand.height}px`;
    content.firstElementChild.style.opacity = contentExpand.opacity;
    if (
      (contentExpand.opacity == 1 &&
        contentExpand.width ==
          clicked.parentNode.getBoundingClientRect().width -
            contentExpand.leftMargin * 2) ||
      isSample
    ) {
      back.style.display = "block";
      backOpacity < 1 ? (backOpacity += 0.1) : (backOpacity = 1);
      back.style.opacity = backOpacity;
      if (backOpacity == 1) {
        clearInterval(showContentTimer);
      }
    }
  }

  function backToMenu() {
    back.removeEventListener("click", createBackEvent);
    content.style.overflow = "hidden";
    let contentWidth =
      content.getBoundingClientRect().width > (contentExpand.width * 6) / 50
        ? content.getBoundingClientRect().width - (contentExpand.width * 6) / 50
        : 0;
    let contentHeight =
      content.getBoundingClientRect().height > (contentExpand.height * 6) / 50
        ? content.getBoundingClientRect().height -
          (contentExpand.height * 6) / 50
        : 0;
    backOpacity > 0 ? (backOpacity -= 0.09) : (backOpacity = 0);
    back.style.opacity = backOpacity;
    content.firstElementChild.style.opacity = backOpacity;
    if (contentWidth == 0 && contentHeight == 0) {
      content.style.display = "none";
      if (backOpacity == 0) {
        clearInterval(hideContentTimer);
        showSectionTimer = setInterval(showSection, 16);
        for (let i in samples) {
          samples[i] = false;
        }
      }
    }
    if (backOpacity == 0) {
      back.style.display = "none";
    }
    content.style.width = `${contentWidth}px`;
    content.style.height = `${contentHeight}px`;
  }

  function showSection() {
    sectionUnclicked.top < 0
      ? sectionUnclicked.top++
      : (sectionUnclicked.top = 0);
    sectionUnclicked.opacity < 1
      ? (sectionUnclicked.opacity += 0.06)
      : (sectionUnclicked.opacity = 1);
    avatar.style.opacity = sectionUnclicked.opacity;
    infoParts.forEach(info => {
      info.style.top = `${sectionUnclicked.top}px`;
      info.style.opacity = sectionUnclicked.opacity;
      info.style.display = "flex";
    });
    if (sectionUnclicked.top == 0 && sectionUnclicked.opacity == 1) {
      cover.style.display = "none";
      clearInterval(showSectionTimer);
    }
  }
}
