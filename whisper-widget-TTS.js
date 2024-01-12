class WhisperCard extends HTMLElement {
  constructor() {
    super();
    // **STEP (1)** //
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }
  
    // Using $Store key to iterate over object and get a specific CAD value
  getWhisperURL() {
    let info = this.cad;
    for (const iterator of info) {
      // change variable 'WhisperMSG' to your own from your Tenant/Flow editor... ie myVar
      try {
		let urltext = iterator[1].interaction.callAssociatedData.WhisperURL.value;
		console.log('WHISPER-URLVAR=' + urltext);
		let fixedurl = urltext.replaceAll('-','/');
		console.log('WHISPER-URLPRE=' + fixedurl);
		let wmsg = iterator[1].interaction.callAssociatedData.WhisperMSG.value;
		console.log('WHISPER-MSG=' + wmsg);
		let finalurl = fixedurl + '?type=' + wmsg;
		console.log('WHISPER-FULLURL=' + finalurl);
        return finalurl;
      } catch (error) {
        return "Error - probably need to change vars to match in Flow Editor or make sure they are agent enabled.";
      }
    }
  }

  // Using $Store key to iterate over the media object from the TaskMap Map/Object
  mediaInfo() {
    const info = this.cad;
    for (const iterator of info) {
      const media = iterator[1].interaction.media;
      const response = Object.keys(media).map(info => {
        return media[info];
      });
      return response;
    }
  }

  // Using $Store key to iterate over the media object and grab the participants
  activeParticipants() {
    // pull out your specific objects
    const info = this.cad;
    for (const iterator of info) {
      const media = iterator[1].interaction.media;
      const response = Object.keys(media).map(info => {
        const { participants } = media[info];
        return participants;
      });
      return response;
    }
  }

  //Render on the DOM
  render() {
    // **STEP (2)** //
    const template = document.createElement("template");
	
    // **STEP (3)** //
    template.innerHTML = `
		<style>
				.container {
					overflow: var(--flow, scroll);
					background: var(--back, inherit);
					min-height: 150px;
					max-height: 300px;
					/*overflow: scroll;*/
					color: #6583bb; 
				}
				
				.cards {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
					grid-auto-rows: auto;
					grid-gap: 1rem;
				}
					h1 {
					text-align: center;
					width: 100%;
					}
					/* User Card */
					.card {
						border: 2px solid #BEBEBE;
						border-radius: 10px;
						padding: .5rem;
						min-height: 150px;
						max-height: 300px;
						overflow: scroll;
						color: #6583bb; 
					}
					img {
						margin-top: 15px;
						border-radius: 10px;
						display: block;
					}		
					.hide {
						display: none;
					}
					.show {
						font-size: large;
						padding-left:0;
						display: block;
					}
					.btn {
						border: none;
						height: 36px;
						width: 140px;
						padding: 6px 18px;
						border-radius: 20px;
						background: #007AA3;
						color: white;
						cursor: pointer;
						transition: 0.3s;
					}
					.btn:hover{
						background: #005E7D;
						opacity: 1;
					}
					.italic{
						font-style: oblique;
						text-decoration: underline #FF3028;
					}
		</style>
					
					
		
					<div class="container">
									<button class="btn">WHISPER URL</button>
									<p class="hide"> value: ${this.getWhisperURL()}</p>
									<iframe src="${this.getWhisperURL()}" allow="autoplay" style="display:none" id="iframeAudio">
									</iframe> 
									
					</div>
		`;

    // **STEP (4)** //
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // toggle
    Array.from(this.shadowRoot.querySelectorAll("div.container")).forEach(e => {
      e.addEventListener("click", function (e) {
        let target = e.target.nextSibling.nextSibling;
        target.classList.toggle("hide");
      });
    });
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "name") {
      Array.from(this.shadowRoot.querySelectorAll("h3")).forEach(e => {
        e.innerText = this.getAttribute("name");
      });
    } else if (attrName === "avatar") {
      Array.from(this.shadowRoot.querySelectorAll("img")).forEach(e => {
        e.href = this.getAttribute("avatar");
      });
    } else if (attrName === "darkmode") {
      const darkMode = this.getAttribute("darkmode");
      if (darkMode === "true") {
        Array.from(this.shadowRoot.querySelectorAll(".card")).forEach(e => {
          e.style.background = "#000";
          e.style.color = "#fff";
        });
      } else {
        Array.from(this.shadowRoot.querySelectorAll(".card")).forEach(e => {
          e.style.background = "#fff";
          e.style.color = "#000";
        });
      }
    }
  }
  static get observedAttributes() {
    return ["name", "darkmode", "avatar"];
  }
}
window.customElements.define("whisper-card", WhisperCard);
