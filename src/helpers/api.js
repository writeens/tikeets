import shortid from 'shortid';
import { getURL } from './helpers';

const baseURL = getURL();

/** RESERVE TICKETS */
const reserveTickets = async (data) => {
  const url = `${baseURL}/users/${data.uid}/ticket`;

  // Get current tickets
  const response = await fetch(url);
  const oldInfo = await response.json();

  const oldTickets = oldInfo.tickets;

  // Check If tickets for event has been reserved before
  const ticketIndex = oldTickets.findIndex((item) => item.event === data.id);

  // Event Exists/Update Event
  if (ticketIndex > -1) {
    const updatedAttendees = [...oldTickets[ticketIndex].attendees, ...data.attendees];
    oldTickets[ticketIndex] = { attendees: updatedAttendees, event: data.id };
    const newUserData = {
      ...oldInfo,
      tickets: oldTickets,
    };
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    });
    return;
  }

  const newTickets = [...oldTickets, {
    attendees: data.attendees, event: data.id,
  }];

  const newUserData = {
    ...oldInfo,
    tickets: newTickets,
  };
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
  });
};

/** CANCEl TICKETS */
const cancelTickets = async (uid, eventId) => {
  const url = `${baseURL}/users/${uid}/ticket`;

  // Get current tickets
  const response = await fetch(url);
  const oldInfo = await response.json();

  const newTickets = oldInfo.tickets.filter((item) => item.event !== eventId);

  const newUserData = {
    ...oldInfo,
    tickets: newTickets,
  };

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
  });
};

/** DELETE EVENT */
const deleteEvent = async (eventId) => {
  const url = `${baseURL}/events/${eventId}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/** GET EVENT TICKETS */
const getEventTickets = async (eventId) => {
  const url = `${baseURL}/users`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const users = await response.json();

  // console.log(users);

  const usersWhoReservedThisEvent = users.filter((item) => {
    const { tickets } = item;
    const indexOfReservedTicketForThisEvent = tickets
      .findIndex((ticket) => ticket.event === eventId);
    if (indexOfReservedTicketForThisEvent === -1) {
      return false;
    }
    return true;
  });

  const ticketData = usersWhoReservedThisEvent.map((item) => {
    const { tickets, firstName, lastName } = item;
    const singleTicket = tickets.find((ticket) => ticket.event === eventId);

    return {
      name: `${firstName} ${lastName}`,
      attendees: singleTicket.attendees,
      id: shortid.generate(),
    };
  });
  return ticketData;
};

export {
  reserveTickets,
  cancelTickets,
  deleteEvent,
  getEventTickets,
};
