import * as TOUR_TYPES from '../constants/createTourConstant';
// import * as dateUtils from '../../utils/date';

const INIT_STATE = {
  name: '',
  content: '',
  hashtags: [],
  isPublic: false,
  image: null,
  tour: [],
  isFetching: false,
  error: null,
  cost: 0,
  recommendService: {
    list: null,
    indexEvent: null,
    indexDate: null
  }
};

const createTourReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOUR_TYPES.CREATE_TOUR: {
      return {
        ...INIT_STATE,
        name: action.payload.name,
        tour: [
          {
            date: action.payload.date,
            events: [{ time: '07:00', description: '', cost: 0 }],
            description: '',
            services: [],
            cost: 0
          }
        ]
      };
    }
    case TOUR_TYPES.ADD_NEW_DATE: {
      var newDate = new Date(state.tour[state.tour.length - 1].date);
      newDate.setDate(newDate.getDate() + 1);
      // dateStr = dateUtils.convertDateToStr(newDate);

      return {
        ...state,
        tour: [
          ...state.tour,
          {
            date: newDate,
            events: [{ time: '07:00', description: '', cost: 0 }],
            description: '',
            services: [],
            cost: 0
          }
        ]
      };
    }
    case TOUR_TYPES.ADD_EVENT: {
      return {
        ...state,
        tour: state.tour.map((item, i) =>
          i === action.payload.indexDate
            ? {
                ...item,
                events: [
                  ...item.events,
                  { time: '07:00', description: '', cost: 0 }
                ]
              }
            : item
        )
      };
    }
    case TOUR_TYPES.UPDATE_TIME_EVENT: {
      return {
        ...state,
        tour: state.tour.map((item, i) =>
          i === action.payload.indexDate
            ? {
                ...item,
                events: item.events.map((event, j) =>
                  j === action.payload.indexEvent
                    ? {
                        ...event,
                        time: action.payload.time
                      }
                    : event
                )
              }
            : item
        )
      };
    }
    case TOUR_TYPES.UPDATE_EVENT: {
      const oldCost =
        state.tour[action.payload.indexDate].events[action.payload.indexEvent]
          .cost;
      const newCost = parseInt(action.payload.cost);

      return {
        ...state,
        tour: state.tour.map((item, i) =>
          i === action.payload.indexDate
            ? {
                ...item,
                cost: item.cost - oldCost + newCost,
                events: item.events.map((event, j) =>
                  j === action.payload.indexEvent
                    ? {
                        ...event,
                        description: action.payload.description,
                        cost: newCost
                      }
                    : event
                )
              }
            : item
        ),
        cost: state.cost - oldCost + newCost
      };
    }
    case TOUR_TYPES.ADD_NEW_LOCATION: {
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                events: date.events.map((event, j) =>
                  j === action.payload.indexEvent
                    ? {
                        ...event,
                        location: action.payload?.location
                      }
                    : event
                )
              }
            : date
        )
      };
    }
    case TOUR_TYPES.DELETE_LOCATION: {
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                events: date.events.map((event, j) =>
                  j === action.payload.indexEvent
                    ? {
                        ...event,
                        location: null
                      }
                    : event
                )
              }
            : date
        )
      };
    }
    case TOUR_TYPES.ADD_NEW_SERVICE: {
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                events: date.events.map((event, j) =>
                  j === action.payload.indexEvent
                    ? {
                        ...event,
                        service: action.payload?.service
                      }
                    : event
                )
              }
            : date
        )
      };
    }
    case TOUR_TYPES.DELETE_SERVICE: {
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                events: date.events.map((event, j) =>
                  j === action.payload.indexEvent
                    ? {
                        ...event,
                        service: null
                      }
                    : event
                )
              }
            : date
        )
      };
    }
    case TOUR_TYPES.DELETE_DATE: {
      let newCost = state.cost - state.tour[action.payload.indexDate].cost;
      return {
        ...state,
        tour: [
          ...state.tour.slice(0, action.payload.indexDate),
          ...state.tour.slice(action.payload.indexDate + 1)
        ],
        cost: newCost
      };
    }
    case TOUR_TYPES.DELETE_EVENT: {
      let oldCostLoc =
        state.tour[action.payload.indexDate].events[action.payload.index]
          ?.cost || 0;
      let newCost = state.cost - oldCostLoc;
      let newCostDate = state.tour[action.payload.indexDate]?.cost - oldCostLoc;

      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                cost: newCostDate,
                events: [
                  ...date.events.slice(0, action.payload.index),
                  ...date.events.slice(action.payload.index + 1)
                ]
              }
            : date
        ),
        cost: newCost
      };
    }
    case TOUR_TYPES.UPDATE_DATE: {
      // dateStr = dateUtils.convertDateToStr(action.payload.newDate);
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                date: action.payload.newDate
              }
            : date
        )
      };
    }
    case TOUR_TYPES.UPDATE_DESCRIPTION_DATE: {
      let oldCost = state.tour[action.payload.indexDate]?.cost || 0;
      const cost = parseInt(action.payload?.cost) || 0;
      let newCost = state.cost - oldCost + cost;
      return {
        ...state,
        cost: newCost,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                cost: cost,
                description: action.payload.description
              }
            : date
        )
      };
    }
    case TOUR_TYPES.UPDATE_LOCATION: {
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                events: date.events.map((loc, j) =>
                  j === action.payload.indexEvent
                    ? {
                        ...loc,
                        location: action.payload?.location || loc.location
                      }
                    : loc
                )
              }
            : date
        )
      };
    }
    case TOUR_TYPES.UPDATE_SERVICE: {
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                events: date.events.map((loc, j) =>
                  j === action.payload.index
                    ? {
                        ...loc,
                        service: action.payload?.service || loc.service
                      }
                    : loc
                )
              }
            : date
        )
      };
    }
    case TOUR_TYPES.CHANGE_IMAGE: {
      return {
        ...state,
        image: action.payload.image
      };
    }
    case TOUR_TYPES.RECOMMEND_SERVICE: {
      return {
        ...state,
        recommendService: action.payload
      };
    }
    case TOUR_TYPES.LOAD_TOUR: {
      return {
        ...state,
        ...action.payload.tour
      };
    }
    case TOUR_TYPES.RESET_TOUR: {
      return {
        name: '',
        image: null,
        tour: [],
        isFetching: false,
        error: null,
        cost: 0
      };
    }
    default: {
      return state;
    }
  }
};

export default createTourReducer;
