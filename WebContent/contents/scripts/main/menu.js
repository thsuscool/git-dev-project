// 열고 닫기
function navy_view(n1,n2) {
	document.getElementById(n1).style.display = 'block';
	document.getElementById(n2).style.display = 'none';
}

// Tab Menu
function initTabMenu(tabContainerID) {
	var tabContainer = document.getElementById(tabContainerID);
	var tabAnchor = tabContainer.getElementsByTagName("a");
	var i = 0;

	for(i=0; i<tabAnchor.length; i++) {
		if (tabAnchor.item(i).className == "tab")
			thismenu = tabAnchor.item(i);
		else
			continue;

		thismenu.container = tabContainer;
		thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
		thismenu.targetEl.style.display = "none";
		thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
		
		thismenu.onmouseover = function tabMenuClick() {
			currentmenu = this.container.current;
			if (currentmenu == this)
				return false;

			if (currentmenu) {
				currentmenu.targetEl.style.display = "none";
				if (currentmenu.imgEl) {
				//	currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", ".gif");
			//	} else {
					currentmenu.className = currentmenu.className.replace(" on", "");
				}
			}
			this.targetEl.style.display = "";
			if (this.imgEl) {
			//	this.imgEl.src = this.imgEl.src.replace(".gif", "_on.gif");
		//	} else {
				this.className += " on";
			}
			this.container.current = this;

			return false;
		};
		
		thismenu.onclick = function tabMenuClick() {
			currentmenu = this.container.current;
			if (currentmenu == this)
				return false;

			if (currentmenu) {
				currentmenu.targetEl.style.display = "none";
				if (currentmenu.imgEl) {
				//	currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", ".gif");
			//	} else {
					currentmenu.className = currentmenu.className.replace(" on", "");
				}
			}
			this.targetEl.style.display = "";
			if (this.imgEl) {
			//	this.imgEl.src = this.imgEl.src.replace(".gif", "_on.gif");
			//} else {
				this.className += " on";
			}
			this.container.current = this;

			return false;
		};

		if (!thismenu.container.first)
			thismenu.container.first = thismenu;
	}
	if (tabContainer.first)
		tabContainer.first.onmouseover();
	
	if (tabContainer.first)
		tabContainer.first.onclick();
}

// Tab Menu2
function initTabMenu2(tabContainerID) {
	var tabContainer = document.getElementById(tabContainerID);
	var tabAnchor = tabContainer.getElementsByTagName("a");
	var i = 0;

	for(i=0; i<tabAnchor.length; i++) {
		if (tabAnchor.item(i).className == "tab")
			thismenu = tabAnchor.item(i);
		else
			continue;

		thismenu.container = tabContainer;
		thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
		thismenu.targetEl.style.display = "none";
		thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
		
		thismenu.onmouseover = function tabMenuClick() {
			currentmenu = this.container.current;
			if (currentmenu == this)
				return false;

			if (currentmenu) {
				currentmenu.targetEl.style.display = "none";
				if (currentmenu.imgEl) {
					currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", ".gif");
				} else {
					currentmenu.className = currentmenu.className.replace(" on", "");
				}
			}
			this.targetEl.style.display = "";
			if (this.imgEl) {
				this.imgEl.src = this.imgEl.src.replace(".gif", "_on.gif");
			} else {
				this.className += " on";
			}
			this.container.current = this;

			return false;
		};
		
		thismenu.onclick = function tabMenuClick() {
			currentmenu = this.container.current;
			if (currentmenu == this)
				return false;

			if (currentmenu) {
				currentmenu.targetEl.style.display = "none";
				if (currentmenu.imgEl) {
					currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", ".gif");
				} else {
					currentmenu.className = currentmenu.className.replace(" on", "");
				}
			}
			this.targetEl.style.display = "";
			if (this.imgEl) {
				this.imgEl.src = this.imgEl.src.replace(".gif", "_on.gif");
			} else {
				this.className += " on";
			}
			this.container.current = this;

			return false;
		};

		if (!thismenu.container.first)
			thismenu.container.first = thismenu;
	}
	if (tabContainer.first)
		tabContainer.first.onmouseover();
	
	if (tabContainer.first)
		tabContainer.first.onclick();
}