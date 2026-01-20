import Reservation from "@app/models/reservation.model";
import { NotFoundException } from "@app/common/exceptions/httpException";
import { IService } from "./IService";
import { CreateReservationDto } from "@app/dtos/reservation.dto";
import User from "@app/models/user.model";
import Car from "@app/models/car.model";

export class ReservationService implements IService<Reservation> {
  async find() {
    const reservations = await Reservation.findAll({
      include: [User, Car]
    });
    if (reservations.length === 0) throw new NotFoundException('No reservations found');

    return reservations;
  }

  async findOne(id: number) {
    const reservation = await Reservation.findByPk(id, {
      include: [User, Car]
    });
    if (reservation) return reservation;

    throw new NotFoundException(`Reservation with id ${id} not found`);
  }

  async create(reservationData: CreateReservationDto) {
    const newReservation = await Reservation.create(reservationData);
    return newReservation;
  }

  async update(id: number, reservationData: Partial<Reservation>) {
    const reservation = await Reservation.findByPk(id);

    if (!reservation) throw new NotFoundException(`Reservation with id ${id} not found`);

    const updatedReservation = await reservation.update(reservationData);
    return updatedReservation;
  }

  async remove(id: number) {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) throw new NotFoundException(`Reservation with id ${id} not found`);

    await reservation.update({ status: 'CANCELLED' });
    return true;
  }

  async findUserReservations(id: number) {
    const reservations = await Reservation.findAll({
      where: {
        userId: id,
        status: 'SOLICITED'
      },
      include: [Car]
    });
    if (reservations.length === 0) throw new NotFoundException(`No reservations found for user with id ${id}`);

    return reservations;
  }
}