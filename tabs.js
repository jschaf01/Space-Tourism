//tab list keyboard nav
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    var curFocus = tabFocus;

    switch (e.keyCode)
    {
        case keydownLeft:
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }

            break;

        case keydownRight:
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }

            break;

        default:
            return;
    }
    
    tabs[curFocus].setAttribute("tabindex", -1);
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}
