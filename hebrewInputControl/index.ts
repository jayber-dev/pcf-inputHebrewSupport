import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class hebrewInputControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    /**
     * Empty constructor.
     */
    private _container: HTMLDivElement;
    private _inputElem: HTMLInputElement;
    private _context: ComponentFramework.Context<IInputs>
    private _value: string | boolean;
    private _notifyOutputChanged: () => void;
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        notifyOutputChanged()
        this._notifyOutputChanged = notifyOutputChanged
        this._value = context.parameters.inputValue.raw!
        this._context = context
        this._container = document.createElement("div")
        this._inputElem = document.createElement("input")
        this._inputElem.setAttribute("type",context.parameters.type.raw)
        console.log(context.parameters.Disabled.raw);

        // -------------------------background color ------------------------
        if(context.parameters.backgroundColor.raw!.length > 0) {
            this._inputElem.style.backgroundColor = `${context.parameters.backgroundColor.raw!}`
        }
        // ------------------------- is disabled ----------------------------
        if(context.parameters.Disabled.raw === "true") {
            this._inputElem.setAttribute("disabled","true")
        } 

        // ------------------------- border styling -------------------------
        if(context.parameters.borderTop.raw!.length > 0) {
            this._inputElem.style.borderTop = `${context.parameters.borderTop.raw!}px solid`
        }
        if(context.parameters.borderBottom.raw!.length > 0) {
            this._inputElem.style.borderBottom = `${context.parameters.borderBottom.raw!}px solid`
        }
        if(context.parameters.borderRight.raw!.length > 0) {
            this._inputElem.style.borderRight = `${context.parameters.borderRight.raw!}px solid`
        }
        if(context.parameters.borderLeft.raw!.length > 0) {
            this._inputElem.style.borderLeft = `${context.parameters.borderLeft.raw!}px solid`
        }
        if(context.parameters.borderRadius.raw!.length > 0) {
            this._inputElem.style.borderRadius = `${context.parameters.borderRadius.raw!}px`
        }


        
        this._inputElem.addEventListener("input", this.handleChange.bind(this))
        this._container.appendChild(this._inputElem)
        container.appendChild(this._container)

        // Add control initialization code
    }

    public handleChange() {
        if(this._context.parameters.type.raw === "checkbox") {

            this._context.parameters.inputValue.raw = this._inputElem.checked ? "true" : "false";
            this._notifyOutputChanged()
            return
        }
        this._value = this._inputElem.value
        this._context.parameters.inputValue.raw = this._inputElem.value
        
        this._notifyOutputChanged()
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // -------------------------background color ------------------------
        if(context.parameters.backgroundColor.raw!.length > 0) {
            this._inputElem.style.backgroundColor = `${context.parameters.backgroundColor.raw!}`
        }
        // ------------------------- is disabled ----------------------------
        if(context.parameters.Disabled.raw === "true") {
            this._inputElem.setAttribute("disabled","true")
        } else {
            this._inputElem.removeAttribute("disabled")
        }

        // ------------------------- border styling ------------------------
        if(context.parameters.borderTop.raw!.length > 0) {
            this._inputElem.style.borderTop = `${context.parameters.borderTop.raw!}px solid`
        }
        if(context.parameters.borderBottom.raw!.length > 0) {
            this._inputElem.style.borderBottom = `${context.parameters.borderBottom.raw!}px solid`
        }
        if(context.parameters.borderRight.raw!.length > 0) {
            this._inputElem.style.borderRight = `${context.parameters.borderRight.raw!}px solid`
        }
        if(context.parameters.borderLeft.raw!.length > 0) {
            this._inputElem.style.borderLeft = `${context.parameters.borderLeft.raw!}px solid`
        }
        if(context.parameters.borderRadius.raw!.length > 0) {
            this._inputElem.style.borderRadius = `${context.parameters.borderRadius.raw!}px`
        }

        // ------------------------ inputValue -----------------------------

        this._inputElem.setAttribute("type",context.parameters.type.raw)

        this._inputElem.value = this._context.parameters.inputValue.raw!
        console.log('hello');
        
        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {inputValue: this._context.parameters.inputValue.raw!};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        this._inputElem.removeEventListener("input", this.handleChange)
        // Add code to cleanup control if necessary
    }
}
