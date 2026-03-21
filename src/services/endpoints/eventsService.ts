import { HttpClient } from '@/services/api/httpClient';
import { API_ENDPOINTS } from '@/config/apiConfig';
import type { Event, PaginatedResponse } from '@/services/types';

/**
 * Events Service - Handles all event-related API calls for MPSS
 * Project-specific service for managing events, registrations, and event details
 */
export class EventsService {
  /**
   * Fetch all events
   * @returns Promise<Event[]> - Array of all events
   */
  static async getAllEvents(): Promise<Event[]> {
    try {
      const events = await HttpClient.get<Event[]>(API_ENDPOINTS.EVENTS.LIST);
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  /**
   * Fetch events with pagination
   * @param page - Page number (1-indexed)
   * @param pageSize - Number of events per page
   */
  static async getEventsPaginated(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Event>> {
    try {
      const params = {
        _page: page,
        _limit: pageSize,
      };
      const events = await HttpClient.getPaginated<Event>(
        API_ENDPOINTS.EVENTS.LIST,
        params
      );
      return events;
    } catch (error) {
      console.error('Error fetching paginated events:', error);
      throw error;
    }
  }

  /**
   * Fetch a single event by ID
   * @param id - Event ID
   * @returns Promise<Event> - Single event object
   */
  static async getEventById(id: number): Promise<Event> {
    try {
      const event = await HttpClient.get<Event>(
        `${API_ENDPOINTS.EVENTS.GET}/${id}`
      );
      return event;
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch upcoming events (future dates)
   * @param limit - Maximum number of events to return
   */
  static async getUpcomingEvents(limit: number = 5): Promise<Event[]> {
    try {
      const events = await HttpClient.get<Event[]>(API_ENDPOINTS.EVENTS.LIST, {
        params: { _sort: 'date', _order: 'asc', _limit: limit },
      });
      // Filter events with future dates
      const now = new Date();
      return events.filter(event => new Date(`${event.date} ${event.time}`) > now);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  }

  /**
   * Fetch events by category
   * @param category - Event category (workshop, seminar, fundraiser, community, scholarship)
   */
  static async getEventsByCategory(
    category: Event['category']
  ): Promise<Event[]> {
    try {
      const events = await HttpClient.get<Event[]>(
        API_ENDPOINTS.EVENTS.LIST,
        {
          params: { category },
        }
      );
      return events;
    } catch (error) {
      console.error(`Error fetching events for category ${category}:`, error);
      throw error;
    }
  }

  /**
   * Create a new event
   * @param event - Event data
   * @returns Promise<Event> - Created event with ID
   */
  static async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    try {
      const newEvent = await HttpClient.post<Event>(
        API_ENDPOINTS.EVENTS.CREATE,
        event
      );
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  /**
   * Update an existing event
   * @param id - Event ID
   * @param event - Updated event data
   * @returns Promise<Event> - Updated event
   */
  static async updateEvent(id: number, event: Partial<Event>): Promise<Event> {
    try {
      const updatedEvent = await HttpClient.put<Event>(
        `${API_ENDPOINTS.EVENTS.UPDATE}/${id}`,
        event
      );
      return updatedEvent;
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete an event
   * @param id - Event ID
   * @returns Promise<void>
   */
  static async deleteEvent(id: number): Promise<void> {
    try {
      await HttpClient.delete(`${API_ENDPOINTS.EVENTS.DELETE}/${id}`);
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      throw error;
    }
  }

  /**
   * Register a user for an event
   * @param eventId - Event ID
   * @param userId - User ID
   * @returns Promise<{ success: boolean }>
   */
  static async registerForEvent(eventId: number, userId: number): Promise<{ success: boolean }> {
    try {
      const result = await HttpClient.post<{ success: boolean }>(
        `${API_ENDPOINTS.EVENTS.GET}/${eventId}/register`,
        { userId }
      );
      return result;
    } catch (error) {
      console.error(`Error registering for event ${eventId}:`, error);
      throw error;
    }
  }

  /**
   * Search events by title or description
   * @param query - Search query string
   */
  static async searchEvents(query: string): Promise<Event[]> {
    try {
      const events = await HttpClient.get<Event[]>(API_ENDPOINTS.EVENTS.LIST, {
        params: { q: query },
      });
      return events;
    } catch (error) {
      console.error(`Error searching events with query "${query}":`, error);
      throw error;
    }
  }
}
