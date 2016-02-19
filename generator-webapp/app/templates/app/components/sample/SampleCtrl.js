function <%= componentNameCap %>Ctrl(<%= componentNameCap %>DataResolver) {
	var scope = this;
	scope.data = <%= componentNameCap %>DataResolver;
}
<%= componentNameCap %>Ctrl.$inject = ['<%= componentNameCap %>DataResolver'];

angular.module('<%= appname %>').controller('<%= componentNameCap %>Ctrl', <%= componentNameCap %>Ctrl);