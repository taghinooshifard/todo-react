export const todoReducer = (todos,action)=>{
    switch (action.type) {
        case 'init-list':
            return [...action.todos];
        case 'toggle-status':
            
            return [...action.todos]
        case 'addtodo':
            return [...todos,action.todos]
        case 'deletetodo':
            return [...action.todos]
        case 'edittodo':
            return [...action.todos]
        default:
            break;
    }
}