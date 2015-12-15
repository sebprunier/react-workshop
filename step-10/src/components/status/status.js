exports.Statuses = ["NEW", "IN_PROGRESS", "DONE"];

exports.StatusesLabels = {
    NEW: "Nouveau",
    IN_PROGRESS: "En cours",
    DONE: "Terminé"
};

exports.StatusesActions = {
    NEW: "Commencer",
    IN_PROGRESS: "Terminer"
};

exports.StatusesColors = {
    NEW: {
        color: "#F7464A",
        highlightColor: "#FF5A5E"
    },
    IN_PROGRESS: {
        color: "#FDB45C",
        highlightColor: "#FFC870"
    },
    DONE: {
        color: "#46BFBD",
        highlightColor: "#5AD3D1"
    }
};
