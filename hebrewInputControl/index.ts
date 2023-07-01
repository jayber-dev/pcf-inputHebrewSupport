import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class hebrewInputControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    /**
     * Empty constructor.
     */
    private _container: HTMLDivElement;
    private _inputElem: HTMLInputElement;
    private _context: ComponentFramework.Context<IInputs>
    private _value: string | boolean;
    private _notifyOutputChanged: () => void;
    constructor() {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {

        notifyOutputChanged()
        this._notifyOutputChanged = notifyOutputChanged
        this._value = context.parameters.inputValue.raw!
        this._context = context
        this._container = document.createElement("div")
        this._inputElem = document.createElement("input")
        this._inputElem.addEventListener("input", this.handleChange.bind(this))
        this._inputElem.setAttribute("type", context.parameters.type.raw)

        // ------------------------- text direction --------------------------
        this._inputElem.style.direction = context.parameters.textDirection.raw!
        // ------------------------- background color ------------------------
        if (context.parameters.backgroundColor.raw!.length > 0) {
            this._inputElem.style.backgroundColor = `${context.parameters.backgroundColor.raw!}`
        }
        // ------------------------- is disabled ----------------------------
        // if (context.parameters.disabled.raw) {
        //     this._inputElem.setAttribute("disabled", "true")
        // } 
        this._inputElem.setAttribute("disabled", `${context.parameters.disabled.raw}`)

        // ------------------------- Font Styilng ---------------------------
        this._inputElem.style.fontSize = `${context.parameters.fontSize.raw}px`

        // ------------------------- border styling -------------------------
   
        this._inputElem.style.borderTop = `${context.parameters.borderTop.raw!}px solid` || "1px solid"
        this._inputElem.style.borderBottom = `${context.parameters.borderBottom.raw!}px solid` || "1px"
        this._inputElem.style.borderRight = `${context.parameters.borderRight.raw!}px solid` || "1px"
        this._inputElem.style.borderLeft = `${context.parameters.borderLeft.raw!}px solid` || "1px"
        this._inputElem.style.borderRadius = `${context.parameters.borderRadius.raw!}px` || "1px"
      
        // ------------------------- border onFocus Styling ------------------
        
        this._inputElem.addEventListener("focus", this.handleFocus.bind(this))
        this._inputElem.addEventListener("blur", this.handleBlur.bind(this))

        // ------------------------- Padding styling -------------------------

        this._inputElem.style.paddingTop = `${context.parameters.paddingTop.raw!}px` || "1px"
        this._inputElem.style.paddingBottom = `${context.parameters.paddingBottom.raw!}px` || "1px"
        this._inputElem.style.paddingRight = `${context.parameters.paddingRight.raw!}px` || "1px"
        this._inputElem.style.paddingLeft = `${context.parameters.paddingLeft.raw!}px` || "1px"

        // ------------------------- animations Initialization ---------------c
        console.log(context.parameters.animationOnInit.raw);
        if(context.parameters.animationOnInit.raw !== "none") {
            this._inputElem.classList.add(context.parameters.animationOnInit.raw)
        }

        
        // ------------------------- Elemnts Creation ------------------------        
        this._container.appendChild(this._inputElem)
        container.appendChild(this._container)
    }

    

    
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {

        // ------------------------- text direction --------------------------
        this._inputElem.style.direction = context.parameters.textDirection.raw!
        // -------------------------background color ------------------------
        if (context.parameters.backgroundColor.raw!.length > 0) {
            this._inputElem.style.backgroundColor = `${context.parameters.backgroundColor.raw!}`
        }
        // ------------------------- is disabled ----------------------------
        if (context.parameters.disabled.raw) {
            this._inputElem.setAttribute("disabled", "true")
         
        } else {
           
            this._inputElem.removeAttribute("disabled")
        }
        // this._inputElem.setAttribute("disabled", `${context.parameters.disabled.raw}`)
        // ------------------------- Font Styilng ---------------------------
        this._inputElem.style.fontSize = `${context.parameters.fontSize.raw}px`

        // ------------------------- border styling ------------------------

        this._inputElem.style.borderTop = `${context.parameters.borderTop.raw!}px solid` || "1px solid"
        this._inputElem.style.borderBottom = `${context.parameters.borderBottom.raw!}px solid` || "1px solid"
        this._inputElem.style.borderRight = `${context.parameters.borderRight.raw!}px solid` || "1px solid"
        this._inputElem.style.borderLeft = `${context.parameters.borderLeft.raw!}px solid` || "1px solid"
        this._inputElem.style.borderRadius = `${context.parameters.borderRadius.raw!}px` || "1px solid"

        
        // ------------------------- Padding styling -------------------------

        this._inputElem.style.paddingTop = `${context.parameters.paddingTop.raw!}px` || "1px"
        this._inputElem.style.paddingBottom = `${context.parameters.paddingBottom.raw!}px` || "1px"
        this._inputElem.style.paddingRight = `${context.parameters.paddingRight.raw!}px` || "1px"
        this._inputElem.style.paddingLeft = `${context.parameters.paddingLeft.raw!}px` || "1px"

        // ------------------------- animations Initialization ---------------c
        console.log(context.parameters.animationOnInit.raw);
        if(context.parameters.animationOnInit.raw !== "none") {
            this._inputElem.classList.add(context.parameters.animationOnInit.raw)
        }

        // ------------------------ inputValue Updating ----------------------

        this._inputElem.setAttribute("type", context.parameters.type.raw)
        this._inputElem.value = this._context.parameters.inputValue.raw!
        
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {
            inputValue: this._context.parameters.inputValue.raw!,
            onSelect: this._context.parameters.onSelect.raw,
            disabled: this._context.parameters.disabled.raw                
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        this._inputElem.removeEventListener("input", this.handleChange)
        this._inputElem.removeEventListener("focus", this.handleFocus)
        this._inputElem.removeEventListener("blur", this.handleBlur)
        // Add code to cleanup control if necessary
    }

    // --------------------- Costum Functions(handlers) --------------------

    public handleChange() {
        if (this._context.parameters.type.raw === "checkbox") {

            this._context.parameters.inputValue.raw = this._inputElem.checked ? "true" : "false";
            this._notifyOutputChanged()
            return
        }
        this._value = this._inputElem.value
        this._context.parameters.inputValue.raw = this._inputElem.value

        this._notifyOutputChanged()
    }

    public handleFocus(){
        // this._inputElem.classList.add("input-focused")
        this._context.parameters.onSelect.raw = true
        this._inputElem.style.outlineWidth = `${this._context.parameters.outlineWidth.raw}px`
        this._inputElem.style.outlineOffset = `${this._context.parameters.outlineOffset.raw}px`
        this._inputElem.style.outlineColor = `${this._context.parameters.outlineColor.raw}`
        this._inputElem.style.outlineStyle = this._context.parameters.outlineStyle.raw     
        this._notifyOutputChanged()
    }

    public handleBlur(){
        this._context.parameters.onSelect.raw = false
        this._inputElem.style.outline = "none"
        this._notifyOutputChanged()
    }
}
