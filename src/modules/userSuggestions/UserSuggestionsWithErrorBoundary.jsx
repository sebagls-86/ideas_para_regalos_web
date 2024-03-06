// UserSuggestionsWithErrorBoundary.jsx
import React from "react";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";

class UserSuggestionsWithErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error("Error al cargar UserSuggestions:", error);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error al cargar UserSuggestions. Inténtalo de nuevo más tarde.</div>;
    }
    return <UserSuggestions />;
  }
}

export default UserSuggestionsWithErrorBoundary;
