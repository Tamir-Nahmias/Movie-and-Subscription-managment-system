import {
  addManyMembers,
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  addMember,
} from "../repositories/membersDB-Repo.js";
import getAllMembersWS from "../repositories/membersWS-Repo.js";
import { getAllMovies } from "../repositories/moviesDB-Repo.js";
import {
  deleteAllSubscriptions,
  getAllSubscriptions,
} from "../repositories/subscriptionsDB-Repo.js";

//name , email, city
const onInitPopulateMemberDB = async () => {
  const { data } = await getAllMembersWS();
  const members = data.map((member) => {
    return {
      name: member.name,
      email: member.email,
      city: member.address.city,
    };
  });
  return addManyMembers(members);
};

const getMembers = (filters) => {
  return getAllMembers(filters);
};

const addMemberDB = (member) => {
  return createMember(member);
};

const getMemberByIDdb = async (id) => {
  return getMemberById(id);
};

const updateMemberByIdDB = (id, obj) => {
  return updateMember(id, obj);
};

const deleteMemberByiDFromDB = async (memberID) => {
  // delete memeber from memeber collection and from subscriptions

  const deleteSubs = await deleteAllSubscriptions({ memberID });
  if (deleteSubs) {
    const deletedMember = await deleteMember(memberID);
    return { ...deletedMember, ...deleteSubs };
  }
  return { message: "memeber hasn't  removed from collection" };
};

const getSubsByMovies = async (filters) => {
  try {
    const [movies, subscriptions, members] = await Promise.all([
      getAllMovies(filters),
      getAllSubscriptions(),
      getAllMembers(),
    ]);

    if (
      !Array.isArray(movies) ||
      !Array.isArray(subscriptions) ||
      !Array.isArray(members)
    ) {
      console.error(
        "❌ Expected movies, subscriptions, and members to be arrays."
      );
      return [];
    }

    // Create lookup maps
    const movieMap = new Map(
      movies.map((movie) => [movie._id.toString(), movie])
    );
    const memberMap = new Map(
      members.map((member) => [member._id.toString(), member])
    );

    // Enrich subscriptions with member info and movies info
    const enrichedSubscriptions = subscriptions.map((sub) => {
      const member = memberMap.get(sub.memberID?.toString());

      if (!Array.isArray(sub.movies)) {
        console.warn("⚠️ Subscription has no 'movies' array:", sub);
        return { ...sub, memberName: member?.name || "Unknown", movies: [] };
      }

      const enrichedMovies = sub.movies
        .map(({ movieID, date }) => {
          const movie = movieMap.get(movieID?.toString());
          if (!movie) {
            console.warn(`⚠️ Movie ID ${movieID} not found.`);
            return null;
          }

          return {
            ...movie,
            date,
            memberName: member?.name || "Unknown", // For reverse mapping later
          };
        })
        .filter(Boolean); // Remove nulls

      return {
        ...sub,
        memberName: member?.name || "Unknown",
        movies: enrichedMovies,
      };
    });

    // Group by movie — for each movie, list subscriptions (with member name & watch date)
    const moviesWithSubscriptions = movies.map((movie) => {
      const watchedBy = [];

      enrichedSubscriptions.forEach((sub) => {
        sub.movies.forEach((m) => {
          if (m._id.toString() === movie._id.toString()) {
            watchedBy.push({
              memberName: sub.memberName,
              date: m.date,
              memberID: sub.memberID,
            });
          }
        });
      });

      return {
        ...movie,
        subscriptions: watchedBy, // list of { memberName, date }
      };
    });

    return {
      subscriptions: enrichedSubscriptions,
      movies: moviesWithSubscriptions,
    };
  } catch (err) {
    console.error("🔥 Error in getMoviesJoinSubscription:", err.message);
    return {
      subscriptions: [],
      movies: [],
    };
  }
};

export {
  onInitPopulateMemberDB,
  getMembers,
  addMemberDB,
  getMemberByIDdb,
  updateMemberByIdDB,
  deleteMemberByiDFromDB,
  getSubsByMovies,
};
