export const ENTITY_TYPES = Object.freeze({
    TEXT: {
        name: "TEXT",
        inputType: 'text',
        icon: "fa fa-text-width",
        dataType: "TEXT",
        description: "",
        primary: '#00bf7d', secondary: '#00bf7d08',
        
    },
    CHARACTER: {
        name: "CHARACTER",
        inputType: 'text',
        icon: "fa fa-font",
        dataType: "CHAR(1)",
        description: "",
        primary: '#054fb9', secondary: '#054fb908',

        
    },
    BOOLEAN: {
        name: "BOOLEAN",
        inputType: 'bool',
        icon: "fa fa-toggle-off",
        dataType: "BOOLEAN",
        description: "",
        primary: '#b51963', secondary: '#b5196308',

        
    },
    EMAIL: {
        name: "EMAIL",
        inputType: 'email',
        icon: "fa fa-envelope-o",
        dataType: "TEXT",
        description: "",
        primary: '#800080', secondary: '#80008008',

        
    },
    INTEGER: {
        name: "INTEGER",   
        inputType: 'number',     
        icon: "fa fa-sort-numeric-asc",
        dataType: "INT",
        description: "",
        primary: '#e6308a', secondary: '#e6308a08',

        
    },
    DECIMAL: {
        name: "DECIMAL",
        inputType: 'number',
        icon: "fa fa-text-width",
        dataType: "FLOAT(4)",
        description: "",
        primary: '#c44601', secondary: '#c4460108',

        
    },
    DATE: {
        name: "DATE",
        inputType: 'date',
        icon: "fa fa-calendar",
        dataType: "DATE",
        description: "",
        primary: '#5ba300', secondary: '#5ba30008',

        
    },
    TIME: {
        name: "TIME",
        inputType: 'time',
        icon: "fa fa-clock-o",
        dataType: "TIME",
        description: "",
        primary: '#800000', secondary: '#80000008',
        
    },
    PASSWORD: {
        name: "PASSWORD",
        inputType: 'password',
        icon: "fa fa-unlock-alt",
        dataType: "TEXT",
        description: "",
        primary: '#054fb9', secondary: '#054fb908',
    },
})
