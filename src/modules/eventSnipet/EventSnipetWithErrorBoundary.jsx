// EventSnipetWithErrorBoundary.jsx
import React from "react";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";

class EventSnipetWithErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error("Error al cargar EventSnipet:", error);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error al cargar EventSnipet. Inténtalo de nuevo más tarde.</div>;
    }
    return <EventSnipet />;
  }
}

export default EventSnipetWithErrorBoundary;
